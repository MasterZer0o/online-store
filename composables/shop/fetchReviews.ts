export async function fetchReviews(productId: number | string, aborted: Ref<boolean>) {
  const abortController = new AbortController()

  const unwatch = watch(aborted, (didAbort) => {
    if (didAbort)
      abortController.abort()
  })

  try {
    const data = await $fetch<ReviewData[]>(`/product/${productId}/reviews`, {
      signal: abortController.signal
    })

    unwatch()

    return data
  }
  catch (error) {
    return null
  }
}
