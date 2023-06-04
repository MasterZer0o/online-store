import { categories } from '../db/schema/products'

export default defineEventHandler(async (): Promise<CategoriesReturn> => {
  const test = await getDb().select({
    name: categories.name,
    slug: categories.slug,
    type: categories.type,
    related_to: categories.relatedTo,
    id: categories.id
  }).from(categories)

  const { BASE_URL } = useRuntimeConfig()

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

  return merged
})
declare global {
  type CategoriesReturn = {
    name: string
    subCategories: Record<'link' | 'slug' | 'name', string>[]
}[]
}
