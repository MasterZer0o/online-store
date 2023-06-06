export const useProducts = defineStore('products', () => {
  const products = ref<Product[]>([])

  const isLoadingInitial = ref<boolean>(true)
  const cid = ref<string | undefined>()

  interface CategoryMeta {
    name: string
    slug: string
    productCount: number
    totalPages: number
}
  const currentPage = ref<number>(1)

  const currentCategory: CategoryMeta = reactive({
    name: '',
    slug: '',
    productCount: 0,
    totalPages: 0
  })

  const categories = ref<CategoriesReturn>()
  const isGridView = ref<boolean>(true)

  const isLoadingProducts = ref<boolean>(false)

  function beginLoader() {
    isLoadingProducts.value = true
  }

  function stopLoader() {
    isLoadingProducts.value = false
  }

  function toInitialState() {
    cid.value = undefined
    currentCategory.totalPages = 0
    currentCategory.productCount = 0
    currentPage.value = 1
  }

  /**
   * Resets cursor id
   */
  function resetCursor() {
    cid.value = undefined
  }

  const sortingOption = ref('')
  return {
    beginLoader,
    stopLoader,
    toInitialState,
    resetCursor,
    categories,
    cid,
    isLoadingProducts,
    products,
    currentPage,
    sortingOption,
    isLoadingInitial,
    currentCategory,
    isGridView
  }
})
