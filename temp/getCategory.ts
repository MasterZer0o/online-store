import { Category } from '~/server/db/models/Category'

export async function getCategory(slug: string) {
  try {
    const category = await Category.findOne({ where: { slug }, raw: true, attributes: ['name', 'id'] })

    if (category === null)
      throw new Error('Category not found')

    return {
      name: category.name,
      id: category.id
    }
  }
  catch (error: unknown) {
    return { error: 'Category not found' }
  }
}
