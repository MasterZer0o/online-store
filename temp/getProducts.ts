import { Op } from 'sequelize'
import sequelize from '~/server/db/client'
import { Product } from '~/server/db/models/Product'
import { Discount } from '~/server/db/models/Discount'

interface Params {
  categoryId: number | string
  page: string
  cid?: string
  meta: boolean
}

type DataFromDatabase =
    (Product & {
      count?: number
      price: number
    'Discount.type'?: Discount['type']
    'Discount.value'?: Discount['value']
    })[]
export async function getProducts(options: Params) {
  const MAX_PRODUCTS_PER_PAGE = 30
  const whereConditions: Record<string, any> = { category_id: options.categoryId }

  // CASE: get next page results
  if (options.cid) {
    whereConditions.id = {
      [Op.gt]: options.cid
    }
  }
  else {
    // CASE: fresh products request, calculate the offset from the page
    const offset = (parseInt(options.page) - 1) * MAX_PRODUCTS_PER_PAGE || 0

    whereConditions.id = {
      [Op.gte]: sequelize.literal(`(SELECT MIN(id) + ${offset} FROM products WHERE id <= (SELECT MAX(id) FROM products) AND category_id = '${options.categoryId}')`)
    }
  }

  const excludedFields = ['description', 'SKU', 'rating_rate', 'rating_count',
    'created_at', 'updated_at', 'category_id', 'discount_id']

  const props = {
    raw: true,
    limit: MAX_PRODUCTS_PER_PAGE,
    attributes: {
      exclude: excludedFields
    },
    include: [{
      model: Discount,
      attributes: ['value', 'type'],
      on: {
        product_id: {
          [Op.col]: 'Product.id'
        }

      }
    }],
  }

  // CASE: requesting previous/next page, don't need product count (again)
  if (!options.meta) {
    const items = await Product.findAll({
      ...props,
      where: whereConditions,
      order: [['id', 'ASC']]
    }) as unknown as DataFromDatabase

    return {
      items: prepareProducts(items),
      cid: items[items.length - 1]?.id
    }
  }

  // CASE: fetching products with category first time, need product count
  let data = await Product.findAll({
    ...props,
    where: whereConditions,
    order: [['id', 'ASC']],
    // @ts-expect-error - this is a bug in the sequelize types
    attributes: {
      ...props.attributes,
      include: [ // this adds `count` property meaning count of all products in this category
        sequelize.literal(`(SELECT COUNT(*) as count FROM products WHERE products.category_id = '${options.categoryId}')`),
      ]
    },
  }) as unknown as DataFromDatabase
  // CASE: no products in this category or user manually went to page higher than total pages
  if (data.length === 0) {
    data = await Product.findAll({
      raw: true,
      limit: MAX_PRODUCTS_PER_PAGE,
      where: {
        category_id: options.categoryId
      },
      order: [['id', 'DESC']],
      // @ts-expect-error - this is a bug in the sequelize types
      attributes: {
        ...props.attributes,
        include: [
          sequelize.literal(`(SELECT COUNT(*) as count FROM products WHERE category_id = '${options.categoryId}')`)
        ]
      }
    }) as unknown as DataFromDatabase

    if (data.length === 0)
      return { items: [], count: 0, totalPages: 1 }

    data = data.reverse().slice(MAX_PRODUCTS_PER_PAGE - ((data[0].count as number) % 30))
  }
  const allProductsCount = parseInt(data[0].count as unknown as string)
  const totalPages = allProductsCount / MAX_PRODUCTS_PER_PAGE

  const items = prepareProducts(data)

  // CASE: user manually went to page higher than total pages
  if (items.length === 0)
    return { items: [], count: 0, totalPages: 1 }

  return {
    cid: data[data.length - 1]?.id, // cursor id
    items,
    count: allProductsCount,
    totalPages: Number.isInteger(totalPages) ? totalPages : Math.floor(totalPages) + 1
  }
}

function prepareProducts(products: DataFromDatabase): Product[] {
  return products.map((item) => {
    const discount = item['Discount.value'] ?? null
    if (discount) {
      const discountType = item['Discount.type']

      item.price = {
        amount: item.price,
        discountLabel: discountType === 'amount' ? `-${discount}` : `-${discount}%`,
        discounted: discountType === 'amount' ? item.price - discount : Math.floor(item.price - (item.price * discount / 100)) + 0.99
      } as any
    }
    else {
      item.price = {
        amount: item.price
      } as any
    }

    // remove properties that are not needed for response
    (['count', 'Discount.value', 'Discount.type'] as const).forEach(key => delete item[key])
    return item
  })
}
