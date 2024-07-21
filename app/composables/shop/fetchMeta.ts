export async function fetchMeta(route: string) {
  const store = useProducts()

  const meta = await $fetch<{ error: string } | { category: { name: string } }>
  ('/category', { params: { name: route } })

  if ('error' in meta) // ? pass statusCode ?
    throw createError({ statusCode: 404, message: meta.error })

  store.currentCategory.name = meta.category.name
  store.currentCategory.slug = meta.category.name.toLowerCase() // ?to be removed?
}
