export async function fetchReviews(productId: number | string) {
  try {
    await $fetch(`/product/${productId}/reviews`)
  }
  catch (error) {

  }
}
