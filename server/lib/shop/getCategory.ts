import { eq } from 'drizzle-orm'
import { categories } from '~/server/db/schema/products'

export async function getCategory(slug: string) {
  try {
    const db = getDb()

    const [category] = await db.select({
      name: categories.name,
      id: categories.id
    }).from(categories).where(eq(categories.slug, slug)).limit(1)

    if (!category)
      throw new Error('Category not found', { cause: 'Not found' })

    return {
      name: category.name,
      id: category.id
    }
  }

  catch (error: any) {
    if (error?.cause === 'Not found')
      return { error: 'Category not found' }

    return {
      error: 'Internal error'
    }
  }
}
