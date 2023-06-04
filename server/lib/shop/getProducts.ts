import { and, asc, desc, eq, gt, gte, sql } from 'drizzle-orm'
import { discounts, products } from '~/server/db/schema/products'

interface Params {
  categoryId: number
  page: string
  cid?: string
  meta: boolean
}

export async function getProducts(options: Params) {
  const db = getDb()

  const MAX_PRODUCTS_PER_PAGE = 30

  const whereConditions: Record<string, any> = {
    categoryId: options.categoryId,
    filters: [
      eq(products.categoryId, options.categoryId)
    ]
  }

  // CASE: get next page results
  if (options.cid) {
    whereConditions.filters.push(gt(products.id, parseInt(options.cid)))
  }
  else {
    // CASE: fresh products request, calculate the offset from the page
    const offset = (parseInt(options.page) - 1) * MAX_PRODUCTS_PER_PAGE || 0

    whereConditions.filters.push(gte(products.id,
      sql`(SELECT MIN(id) + ${offset} FROM ${products} WHERE ${products.id} <= (SELECT MAX(${products.id}) FROM ${products}) AND ${products.categoryId} = ${whereConditions.categoryId})`
    ))
  }
  const selectFields = {
    id: products.id,
    name: products.name,
    price: products.price,
    product_image: products.image,
    discountValue: discounts.value,
    discountType: discounts.type,
  }

  // CASE: requesting previous/next page, don't need product count (again)
  const join = [discounts, eq(discounts.productId, products.id)] as const

  const where = whereConditions.filters.length > 1 ? and(...whereConditions.filters) : whereConditions.filters[0]

  if (!options.meta) {
    const items = await db.select(selectFields)
      .from(products)
      .leftJoin(...join)
      .where(where)
      .limit(MAX_PRODUCTS_PER_PAGE)
      .orderBy(asc(products.id))

    return {
      items: prepareProducts(items),
      cid: items[items.length - 1]?.id
    }
  }

  // CASE: fetching products with category first time, need product count
  const count = sql<string>`(select count(*) from ${products} where ${products.categoryId} = ${whereConditions.categoryId})`.as('count')
  let data = await db.select({
    ...selectFields,
    count
  })
    .from(products)
    .where(where)
    .leftJoin(...join)
    .limit(MAX_PRODUCTS_PER_PAGE)
    .orderBy(asc(products.id))

  if (data.length === 0) {
    data = await db.select({
      ...selectFields,
      count
    })
      .from(products)
      .where(where)
      .leftJoin(...join)
      .limit(MAX_PRODUCTS_PER_PAGE)
      .orderBy(desc(products.id))
  }

  if (data.length === 0)
    return { items: [], count: 0, totalPages: 1 }

  const allProductsCount = parseInt(data[0].count)

  const totalPages = allProductsCount / MAX_PRODUCTS_PER_PAGE

  const items = prepareProducts(data)

  return {
    cid: data[data.length - 1]?.id, // cursor id
    items,
    count: allProductsCount,
    totalPages: Number.isInteger(totalPages) ? totalPages : Math.floor(totalPages) + 1
  }
}

type Products = {
  id: number
  name: string
  price: number
  product_image: string
  discountValue: number | null
  discountType: 'amount' | 'percentage' | null
  count?: string
}[]
function prepareProducts(products: Products) {
  return products.map((item: Omit<Products[number], 'price'> & ({ price: number | { amount: number;discountLabel?: string;discountedAmount?: number } })) => {
    const discount = item.discountValue ?? null
    const price = item.price as number
    if (discount) {
      const discountType = item.discountType

      item.price = {
        amount: 123
      }

      item.price = {
        amount: price,
        discountLabel: discountType === 'amount' ? `-${discount}` : `-${discount}%`,
        discountedAmount: discountType === 'amount' ? price - discount : Math.floor(price - (price * discount / 100)) + 0.99
      }
    }
    else {
      item.price = {
        amount: price
      }
    }

    // remove properties that are not needed for response
    (['count', 'discountValue', 'discountType'] as const).forEach(key => delete item[key])
    return item
  })
}
