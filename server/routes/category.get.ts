import { getCategory } from '../lib/shop/getCategory'

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event) as { name: string }

  try {
    const category = await getCategory(name)
    if (category.error)
      return {
        error: category.error
      }
    return { category }
  }
  catch (error: any) {
    return {
      error: 'Something went wrong'
    }
  }
})
