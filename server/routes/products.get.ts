import { getCategory } from '../lib/shop/getCategory'
import { getProducts } from '../lib/shop/getProducts'

type QueryParams = Record<'name' | 'page' | 'cid', string> & { meta: 'true' | 'false' }

export default defineEventHandler(async (event) => {
  const { name, page = '1', cid, meta } = getQuery(event) as QueryParams

  const category = await getCategory(name)

  if (category.error)
    throw new Error(category.error)

  const products = await getProducts({ categoryId: category.id!, page, cid, meta: meta === 'true' })

  await wait(500)

  return {
    meta: {
      cid: products.cid,
    },
    items: products.items,
    category: {
      name: category.name,
      slug: name, // ? to be removed?
      productCount: products.count,
      totalPages: products.totalPages
    }
  }
})
