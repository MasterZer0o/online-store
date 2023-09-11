interface FetchReviewsOptions {
  productId: string | number
  page?: number | string
  rating?: any
  cid?: number | string
}

export async function fetchReviews({ productId, page, rating, cid }: FetchReviewsOptions, fetchOptions: Parameters<typeof $fetch>[1] = {}) {
  const data = await $fetch<ReviewData>(`/product/${productId}/reviews`, {
    ...fetchOptions,
    query: {
      page,
      rating,
      cid
    }
  })

  return data
}
export async function fetchInitialReviews(productId: FetchReviewsOptions['productId'], aborted: Ref<boolean>) {
  const abortController = new AbortController()

  const unwatch = watch(aborted, (didAbort) => {
    if (didAbort)
      abortController.abort()
  })

  try {
    const data = await fetchReviews({ productId }, {
      signal: abortController.signal
    })

    const store = productDetailsStore()

    const pagesMap = new Map()
    pagesMap.set(1, data.data)

    store.reviewsPageMap2.set(0, pagesMap)
    store.reviewsCid = data.cid

    return data
  }
  catch (error) {
    return null
  }

  finally {
    unwatch()
  }
}
