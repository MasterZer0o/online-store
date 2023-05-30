import { Op } from 'sequelize'
import { logger } from '@nuxt/kit'
import { Category } from '../db/models/Category'
import { logInfo } from '../lib/logger'

export default defineEventHandler(async (): Promise<CategoriesReturn> => {
  const attributes = ['name', 'slug', 'type', 'related_to', 'id'] as const
  const test = await Category.findAll({
    raw: true,
    // @ts-expect-error - wrong type
    attributes
  })
  const { BASE_URL } = useRuntimeConfig()

  type CategoryObject = Omit<{
    [k in typeof attributes[number]]: string
  }, 'type' | 'related_to' | 'id'>

  // const test2 = test.reduce((prev, curr) => {
  //   const saveObj = {
  //     name: curr.name,
  //     slug: curr.slug,
  //     link: `${BASE_URL}/category/${curr.slug}`
  //   }

  //   const shape = {
  //     key: [{
  //       subCat: {
  //         name: '',
  //         slug: ''
  //       }
  //     }]
  //   }

  //   if (curr.type === 'main') {

  //     prev.main.push({

  //     })
  //     // prev.main.push(saveObj)
  //   }

  //   else prev.subCategories.push(saveObj)

  //   return prev
  // }, { main: [] as CategoryObject[], subCategories: [] as CategoryObject[] })

  const mainCategories = test.filter(category => category.type === 'main')
  const subCategories = test.filter(category => category.type === 'subcategory')

  const merged = mainCategories.reduce((prev, curr,) => {
    const obj: { name: string; subCategories: Record<'link' | 'slug' | 'name', string>[] } = {
      name: curr.name,
      subCategories: []
    }

    for (const subcategory of subCategories) {
      if (subcategory.related_to === curr.id) {
        obj.subCategories.push({
          name: subcategory.name,
          slug: subcategory.slug,
          link: `${BASE_URL}/category/${subcategory.slug}`,
        })
      }
    }
    prev.push(obj)
    return prev
  }, [] as { name: string; subCategories: Record<'link' | 'slug' | 'name', string>[] }[])

  // const test2 = test.reduce((prev, curr) => {
  //   const saveObj = {
  //     name: curr.name,
  //     slug: curr.slug,
  //     link: `${BASE_URL}/category/${curr.slug}`
  //   }

  //   if (curr.type === 'subcategory') {
  //     if (!prev[curr.related_to]) {
  //       prev[curr.related_to].push(curr)
  //     }
  //   }

  //   return prev
  // }, [] as { name: string; subCategories: CategoryObject[] }[])

  // const categories = await Category.findAll({
  //   raw: true,
  //   attributes: ['name', 'slug', 'id'],
  //   where: {
  //     name: {
  //       [Op.in]: ['Spodnie', 'Bluzy'] // ! hardcoded
  //     }
  //   }
  // })

  // return categories.map((category) => {
  //   return {
  //     name: category.name,
  //     link: `${BASE_URL}/category/${category.slug}`,
  //     slug: category.slug
  //   }
  // })

  return merged
})
declare global {
  type CategoriesReturn = {
    name: string
    subCategories: Record<'link' | 'slug' | 'name', string>[]
}[]
}
