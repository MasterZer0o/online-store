<script setup lang="ts">
definePageMeta({
  validate(route: any) {
    return !Number.isNaN(Number.parseInt(route.params.id))
  }
})

const productId = useRoute('p-id-product').params.id

const { data: product, error } = await useFetch<ProductDetails>(`/product/${productId}`)

onMounted(() => wishlistStore().currentlyViewedProductId = product.value!.id)

useHead({
  titleTemplate: () => product.value!.name
})

if (error.value !== null) {
  throw createError({
    message: error.value.data.error.message || 'Page not found',
    statusCode: error.value.data.error.statusCode,
    fatal: true
  })
}
const triggeredReviews = ref(false)
</script>

<template>
  <main class="product-details">
    <div>
      <ProductDetailsDisplay :image-src="product!.image" :name="product!.name" />
      <ProductDetailsImageGallery :images="product!.images" />
    </div>

    <div>
      <ProductDetailsName :product="product!" />
      <ProductDetailsPriceAndRating :price="product!.price" :rating="product!.rating" :reviews="product!.reviewCount" @open-reviews="triggeredReviews = true" />
      <ProductDetailsConfiguration :variants="product!.variants" />
      <ProductDetailsBuy :product="product!" />
      <ProductDetailsDelivery />
    </div>

    <ProductDetailsReviewsPanel
      :total-count="product!.reviewCount"
      :average-rating="product!.rating"
      :open-state="triggeredReviews"
      @close-panel="triggeredReviews = false"
    />
  </main>
</template>
