export async function loadReviews({ page, rating }: { page: number; rating: PossibleRating }) {
  const store = reviewsStore()

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
    data = results.data
  }
  store.reviewsRatingFilter = rating
  store.displayedReviews = data
  store.reviewsPanel.isLoadingMore = false
}

export async function fetchReviews<IsInitialRequest = false>({ page }: { page?: number }, fetchOptions: Parameters<typeof $fetch>[1] = {}) {
  const store = reviewsStore()

  const data = await $fetch<ReviewData<IsInitialRequest>>(`/product/${store.productId}/reviews`, {
    ...fetchOptions,
    query: {
      p: page,
      r: store.reviewsRatingFilter === 0 ? undefined : store.reviewsRatingFilter,
      cid: store.cids.get(store.reviewsRatingFilter)
    }
  })

  store.cids.set(store.reviewsRatingFilter, data.cid)

  return data
}
export async function fetchInitialReviews(aborted: Ref<boolean>) {
  const abortController = new AbortController()

  const store = reviewsStore()
  const unwatch = watch(aborted, (didAbort) => {
    if (didAbort)
      abortController.abort()
  })

  const data = await fetchReviews<true>({}, { signal: abortController.signal })

  store.reviewsPageMap.set(0, new Map([[1, data.data]]))

  unwatch()
  return data
}
