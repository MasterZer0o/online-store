import { Op } from 'sequelize'
import sequelize from '~/server/db/config'
import { Product } from '~/server/db/models/Product'

interface Params {
  categoryId: number | string
  page: string
  cid?: string
  meta: boolean
}
export async function getProducts(options: Params) {
  const MAX_PRODUCTS_PER_PAGE = 30

  const whereConditions: Record<string, any> = { category_id: options.categoryId }

  // case: get next page results
  if (options.cid) {
    whereConditions.id = {
      [Op.gt]: options.cid
    }
  }
  else {
    // case: there is no cursor, calculate the offset from the page
    const offset = (parseInt(options.page) - 1) * MAX_PRODUCTS_PER_PAGE

    whereConditions.id = {
      [Op.gte]: sequelize.literal(`(SELECT MIN(id) + ${offset} FROM products WHERE id <= (SELECT MAX(id) FROM products ) AND category_id = '${options.categoryId}')`)
    }
  }

  const props = {
    raw: true,
    limit: MAX_PRODUCTS_PER_PAGE,
    attributes: { exclude: ['description', 'SKU', 'rating_rate', 'rating_count', 'created_at', 'updated_at', 'category_id', 'discount_id'] },
    where: whereConditions,
    order: [['id', 'ASC']]
  } as any

  // case: requesting previous/next page, don't need product count (again)
  if (!options.meta) {
    const items = await Product.findAll(props)
    return {
      items,
      cid: items[items.length - 1]?.id
    }
  }

  // case fetching products with category first time, need product count
  let data = await Product.findAll({
    ...props,
    attributes: {
      ...props.attributes,
      include: [ // this adds `count` property meaning count of all products in this category`
        sequelize.literal(`(SELECT COUNT(*) as count FROM products WHERE products.category_id = '${options.categoryId}')`),
      ]
    }
  })
  // let exceededMaxPage = false
  // case: no products in this category or user manually went to page higher than total pages
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
        exclude: ['description', 'SKU', 'rating_rate', 'rating_count', 'created_at', 'updated_at', 'category_id', 'discount_id'],
        include: [
          sequelize.literal(`(SELECT COUNT(*) as count FROM products WHERE products.category_id = '${options.categoryId}')`),
        ]
      }
    })
    data = data.reverse().slice(MAX_PRODUCTS_PER_PAGE - ((data[0].count as number) % 30))
    // exceededMaxPage = true // todo: handle page 1 - no products
  }

  const allProductsCount = parseInt(data[0].count! as string)
  const totalPages = allProductsCount / MAX_PRODUCTS_PER_PAGE

  const items = data.map((v) => {
    delete v.count // remove `count` property, since it's not  needed in the response
    return v
  })

  return {
    cid: data[data.length - 1]?.id, // cursor id
    items,
    count: allProductsCount,
    totalPages: Number.isInteger(totalPages) ? totalPages : Math.floor(totalPages) + 1,
    // exceededMaxPage
  }
}
