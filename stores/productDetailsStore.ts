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
  const reviewsPageMap = new Map<StarFilter, Map<PageNumber, ReviewData['data']>>()

  const reviewsCid = ref<number | undefined>()

  const openReviews = () => reviewsPanel.isOpen = true
  const closeReviews = () => reviewsPanel.isOpen = false

  const reviewsRatingFilter = ref(0)
  const reviewsPage = ref(1)
  const filteredReviewsCount = ref(0)

  function resetReviews() {
    displayedReviews.value = []
    reviewsCid.value = undefined
    reviewsRatingFilter.value = 0
    reviewsPageMap.clear()
  }

  function getCachedReviews({ page }: { page: number }) {
    return reviewsPageMap.get(reviewsRatingFilter.value ?? 0)?.get(page)
  }

  function setCachedReviews({ page, rating, reviews }: { page: number; rating: number; reviews: ReviewData['data'] }) {
    if (!reviewsPageMap.get(rating)) {
      reviewsPageMap.set(rating, new Map([[page, reviews]]))
    }
    else {
      reviewsPageMap.get(rating)!.set(page, reviews)
    }
  }

  return {
    productId,
    displayedReviews,
    openReviews,
    closeReviews,
    reviewsPanel,
    reviewsCid,
    reviewsPageMap,
    resetReviews,
    getCachedReviews,
    setCachedReviews,
    reviewsRatingFilter,
    reviewsPage,
    filteredReviewsCount
  }
})
