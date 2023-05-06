export async function fetchProducts(isLoadingMore = false, withMeta = false) {
  const store = useProducts()
  const categoryName = store.currentCategory.slug

  if (isLoadingMore)
    store.beginLoader()

  const products = await $fetch<ProductsResponse>('/products', {
    query: {
      name: categoryName,
      page: store.currentPage,
      cid: store.cid,
      meta: withMeta
    }
  })

  if (products.category?.totalPages < store.currentPage) {
    // this is the case when requested page is greater than total pages.
    // last possible page is loaded and redirecting to that page.

    store.currentPage = products.category?.totalPages
    await navigateTo({
      path: useRoute().path,
      query: { page: store.currentPage },
      replace: true
    })
  }

  store.products = products.items
  // !store.cid && (store.currentCategory = products.category)

  withMeta && (store.currentCategory = products.category)
  store.cid = products.meta.cid

  store.stopLoader()

  store.isLoadingInitial = false
}
