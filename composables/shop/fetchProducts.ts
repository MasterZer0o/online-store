export async function fetchProducts(withMeta = false) {
  const store = useProducts()
  const categoryName = store.currentCategory.slug

  if (!store.isLoadingInitial)
    store.beginLoader()

  const products = await $fetch<ProductsResponse>('/products', {
    query: {
      name: categoryName,
      page: store.currentPage,
      cid: store.cid,
      meta: withMeta
    }
  })

  // this is the case when requested page is greater than total pages.
  // loaded and redirecting to last possible page
  if (products.category?.totalPages < store.currentPage) {
    store.currentPage = products.category?.totalPages

    fetchProducts(true)

    return navigateTo({
      path: useRoute().path,
      query: { page: store.currentPage },
      replace: true
    })
  }

  store.products = products.items

  withMeta && (store.currentCategory = products.category)
  store.cid = products.meta.cid

  store.stopLoader()

  store.isLoadingInitial = false
}
