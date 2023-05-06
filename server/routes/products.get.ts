import { getCategory } from '../lib/shop/getCategory'
import { getProducts } from '../lib/shop/getProducts'

type QueryParams = Record<'name' | 'page' | 'cid', string> & { meta: 'true' | 'false' }

export default defineEventHandler(async (event) => {
  try {
    const { name, page, cid, meta } = getQuery(event) as QueryParams

    const category = await getCategory(name)

    if (category.error)
      throw new Error(category.error)

    const products = await getProducts({ categoryId: category.id!, page, cid, meta: meta === 'true' })

    await new Promise<void>(resolve => setTimeout(() => resolve(), 500)) // fake 500ms delay

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
  }
  catch (error) {
    // TODO handle errors
    console.error(error)
  }
})
