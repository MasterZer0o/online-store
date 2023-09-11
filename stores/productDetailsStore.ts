export const productDetailsStore = defineStore('productDetails', () => {
  const productId = ref<number | string>(0)

  const displayedReviews = ref<ReviewData['data']>([])

  const reviewsPanel = reactive({
    isOpen: false,
    isLoadingMore: false,
    perPage: 0
  })

  type PageNumber = number
  type StarFilter = number
  const reviewsPageMap = new Map<PageNumber, ReviewData['data']>()
  const reviewsPageMap2 = new Map<StarFilter, Map<PageNumber, ReviewData['data']>>()

  const reviewsCid = ref()

  const openReviews = () => reviewsPanel.isOpen = true
  const closeReviews = () => reviewsPanel.isOpen = false

  function resetReviews() {
    displayedReviews.value = []
  }

  return {
    productId,
    displayedReviews,
    openReviews,
    closeReviews,
    reviewsPanel,
    reviewsPageMap,
    reviewsCid,
    reviewsPageMap2,
    resetReviews
  }
})
