import { and, asc, desc, eq, gt, gte, sql } from 'drizzle-orm'
import { discounts, products } from '../../db/schema/products'

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
    image: products.image,
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
      .orderBy(asc(products.id))
      .limit(MAX_PRODUCTS_PER_PAGE)

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
    .orderBy(asc(products.id))
    .limit(MAX_PRODUCTS_PER_PAGE)

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
  image: string
  discountValue: number | null
  discountType: 'amount' | 'percentage' | null
  count?: string

}[]
type PreparedProduct = Omit<Products[number], 'price'>
  & {
  price: number | Product['price']
  uri: Product['uri']
  }

export function prepareProducts(products: Products) {
  const prepared: PreparedProduct[] = []

  for (const product of products) {
    const discount = product.discountValue
    const productPrice = product.price
    let price

    if (discount) {
      const isTypeAmount = product.discountType === 'amount'

      price = {
        amount: productPrice,
        discountLabel: isTypeAmount ? `-${discount}` : `-${discount}%`,
        discounted: isTypeAmount ? productPrice - discount : Math.floor(productPrice - (productPrice * discount / 100)) + 0.99
      }
    }
    else {
      price = {
        amount: productPrice
      }
    }

    Object.defineProperties(product, {
      price: {
        value: price
      },
      uri: {
        value: generateSlug(product.name, product.id),
        enumerable: true
      }
    });

    // remove properties that are not needed for response
    (['discountValue', 'discountType'] as const).forEach(key => delete product[key])

    prepared.push(product as PreparedProduct)
  }

  return prepared
}
function generateSlug(name: string, id: number): string {
  // TODO: get slug from db
  return `/p/${id}-${name.split(' ').join('-').toLowerCase().replaceAll('/', '')}`
}

declare global {
  export interface Product {
    id: number
    name: string
    uri: string
    price: {
      amount: number
      discountLabel?: string
      discounted?: number
    }
    image: string
  }
}
