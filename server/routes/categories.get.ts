import { Op } from 'sequelize'
import { Category } from '../db/models/Category'

export default defineEventHandler(async (): Promise<CategoriesReturn> => {
  const categories = await Category.findAll({
    raw: true,
    attributes: ['name', 'slug', 'id'],
    where: {
      name: {
        [Op.in]: ['Spodnie', 'Bluzy'] // ! hardcoded
      }
    }
  })

  const { BASE_URL } = useRuntimeConfig()

  return categories.map((category) => {
    return {
      name: category.name,
      link: `${BASE_URL}/category/${category.slug}`,
      slug: category.slug
    }
  })
})
declare global {
  type CategoriesReturn = {
    name: string
    link: string
    slug: string
  }[]
}
