export const productDetailsStore = defineStore('productDetails', () => {
  const productId = ref<number | string>(0)

  const displayedReviews = ref<ReviewData[]>([])

  const reviewsPanel = ref({
    isOpen: false,
    isLoadingMore: false
  })

  const openReviews = () => reviewsPanel.value.isOpen = true
  const closeReviews = () => reviewsPanel.value.isOpen = false

  return {
    productId,
    displayedReviews,
    openReviews,
    closeReviews,
    reviewsPanel
  }
})
