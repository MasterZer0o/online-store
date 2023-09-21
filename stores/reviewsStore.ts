export const reviewsStore = defineStore('reviews', () => {
  const productId = ref<number | string>(0)

  const displayedReviews = ref<ReviewData['data']>([])

  const reviewsPanel = reactive({
    isLoadingMore: false,
    perPage: 0
  })

  type PageNumber = number
  type StarFilter = number
  const reviewsPageMap = new Map<StarFilter, Map<PageNumber, ReviewData['data']>>()

  const reviewRatingCounts = {} as Record<PossibleRating, number>
  const reviewsRatingFilter = ref<PossibleRating>(0)

  const cids = new Map<PossibleRating, number>()

  const totalPages = computed(() => {
    const totalPagesRaw = reviewRatingCounts[reviewsRatingFilter.value] / reviewsPanel.perPage
    return Number.isInteger(totalPagesRaw) ? totalPagesRaw : Math.floor(totalPagesRaw) + 1
  })

  const totalCount = ref() as Ref<string>

  const reviewsPage = ref(1)
  const filteredReviewsCount = computed(() => reviewRatingCounts[reviewsRatingFilter.value])

  function resetReviews() {
    displayedReviews.value = []
    reviewsPage.value = 1
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
    reviewsPanel,
    reviewsPageMap,
    resetReviews,
    getCachedReviews,
    setCachedReviews,
    reviewsRatingFilter,
    reviewsPage,
    filteredReviewsCount,
    reviewRatingCounts,
    totalPages,
    totalCount,
    cids
  }
})
