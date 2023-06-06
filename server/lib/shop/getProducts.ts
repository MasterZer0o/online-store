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
  const requestedPage = Number.parseInt(options.page)

  const whereConditions: Record<string, any> = {
    categoryId: options.categoryId,
    filters: [
      eq(products.categoryId, options.categoryId)
    ]
  }

  // CASE: get next page results
  if (options.cid) {
    whereConditions.filters.push(gt(products.id, Number.parseInt(options.cid)))
  }
  else {
    // CASE: fresh products request, calculate the offset from the page
    const offset = (requestedPage - 1) * MAX_PRODUCTS_PER_PAGE || 0

    whereConditions.filters.push(gte(products.id,
      sql`(SELECT MIN(id) + ${offset} FROM ${products} WHERE ${products.id} <= (SELECT MAX(${products.id}) FROM ${products}) AND ${products.categoryId} = ${whereConditions.categoryId})`
    ))
  }
  const selectFields = {
    id: products.id,
    name: products.name,
    price: products.price,
    productImage: products.image,
    discountValue: discounts.value,
    discountType: discounts.type,
  }

  const join = [discounts, eq(discounts.productId, products.id)] as const

  const where = whereConditions.filters.length > 1 ? and(...whereConditions.filters) : whereConditions.filters[0]

  // CASE: requesting previous/next page, don't need product count (again)
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
  const countQuery = db.select({ count: sql<number>`count(*)` }).from(products).where(eq(products.categoryId, whereConditions.categoryId))

  const data = db.select({
    ...selectFields
  })
    .from(products)
    .where(where)
    .leftJoin(...join)
    .limit(MAX_PRODUCTS_PER_PAGE)
    .orderBy(asc(products.id))

  let [results, [{ count: productCount }]] = await Promise.all([data.execute(), countQuery.execute()])

  if (results.length === 0 && requestedPage > 1) {
    results = await db.select({
      ...selectFields
    })
      .from(products)
      .where(where)
      .leftJoin(...join)
      .limit(MAX_PRODUCTS_PER_PAGE)
      .orderBy(desc(products.id))
  }
  const totalPagesRaw = productCount / MAX_PRODUCTS_PER_PAGE
  const totalPages = Number.isInteger(totalPagesRaw) ? totalPagesRaw : Math.floor(totalPagesRaw) + 1

  if (results.length === 0 && totalPages === 0)
    return { items: [], count: 0, totalPages: 1 }

  const items = prepareProducts(results)

  return {
    cid: results[results.length - 1]?.id, // cursor id
    items,
    count: productCount,
    totalPages
  }
}

type Products = {
  id: number
  name: string
  price: number
  productImage: string
  discountValue: number | null
  discountType: 'amount' | 'percentage' | null
  count?: string
}[]

export function prepareProducts(products: Products) {
  return products.map((item: Omit<Products[number], 'price'> & ({ price: number | Product['price'] })) => {
    const discount = item.discountValue ?? null
    const price = item.price as number

    if (discount) {
      const discountType = item.discountType

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
    (['discountValue', 'discountType'] as const).forEach(key => delete item[key])
    return item
  }) as Product[]
}

declare global {
  export interface Product {
    id: number
    name: string
    price: {
      amount: number
      discountLabel?: string
      discountedAmount?: number
    }
    productImage: string
  }
}
