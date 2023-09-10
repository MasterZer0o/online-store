interface FetchReviewsOptions {
  productId: string | number
  page?: number | string
  filters?: any
}

export async function fetchReviews({ productId, page, filters }: FetchReviewsOptions, fetchOptions: Parameters<typeof $fetch>[1] = {}) {
  const data = await $fetch<ReviewData>(`/product/${productId}/reviews`, {
    ...fetchOptions,
    query: {
      page
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

    return data
  }
  catch (error) {
    return null
  }

  finally {
    unwatch()
  }
}
