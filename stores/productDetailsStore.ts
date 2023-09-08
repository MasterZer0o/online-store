export const productDetailsStore = defineStore('productDetails', () => {
  const productId = ref<number | string>(0)

  const displayedReviews = ref<ReviewData['data']>([])

  const reviewsPanel = reactive({
    isOpen: false,
    isLoadingMore: false,
    perPage: 0
  })

  const openReviews = () => reviewsPanel.isOpen = true
  const closeReviews = () => reviewsPanel.isOpen = false

  return {
    productId,
    displayedReviews,
    openReviews,
    closeReviews,
    reviewsPanel
  }
})
