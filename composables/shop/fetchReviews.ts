export async function loadReviews({ page, rating }: { page: number; rating: number }) {
  const store = productDetailsStore()

  store.reviewsRatingFilter = rating
  let data

  const cached = store.getCachedReviews({ page: 1 })
  if (cached) {
    data = cached
  }
  else {
    store.reviewsPanel.isLoadingMore = true
    const results = await fetchReviews({ page })
    store.setCachedReviews({ page: 1, rating, reviews: results.data })
    store.reviewsCid = results.cid
    data = results.data
  }
  store.reviewsRatingFilter = rating
  store.displayedReviews = data
  store.reviewsPanel.isLoadingMore = false
}

export async function fetchReviews({ page }: { page?: number }, fetchOptions: Parameters<typeof $fetch>[1] = {}) {
  const store = productDetailsStore()

  const data = await $fetch<ReviewData>(`/product/${store.productId}/reviews`, {
    ...fetchOptions,
    query: {
      page,
      rating: store.reviewsRatingFilter === 0 ? undefined : store.reviewsRatingFilter,
      cid: store.reviewsCid
    }
  })

  return data
}
export async function fetchInitialReviews(aborted: Ref<boolean>) {
  const abortController = new AbortController()

  const store = productDetailsStore()
  const unwatch = watch(aborted, (didAbort) => {
    if (didAbort)
      abortController.abort()
  })

  const data = await fetchReviews({}, { signal: abortController.signal })

  store.reviewsPageMap.set(0, new Map([[1, data.data]]))
  store.reviewsCid = data.cid

  unwatch()
  return data
}
