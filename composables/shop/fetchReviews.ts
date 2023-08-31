export async function fetchReviews(productId: number | string) {
  return await $fetch<{
    username: string
    comment: string | null
    rating: number | null
}[]>(`/product/${productId}/reviews`)
}
