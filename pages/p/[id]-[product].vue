<script setup lang="ts">
definePageMeta({
  validate(route: any) {
    return !Number.isNaN(Number.parseInt(route.params.id))
  }
})

const productId = useRoute('p-id-product').params.id

const { data: product, error } = await useFetch<ProductDetails>(`/product/${productId}`)

if (error.value?.data) {
  throw createError({
    message: error.value?.data.error.message || 'Page not found',
    statusCode: error.value?.data.error.statusCode,
    fatal: true
  })
}
</script>

<template>
  <main class="product-details">
    <div>
      <ProductDetailsDisplay :image-src="product!.image" :name="product!.name" />
      <ProductDetailsImageGallery />
    </div>

    <div>
      <ProductDetailsPath />
      <ProductDetailsName :product="product!" />
      <ProductDetailsPriceAndRating :price="product!.price" :rating="product!.rating" :reviews="product!.reviewCount" />
      <ProductDetailsConfiguration />
      <ProductDetailsBuy />
      <ProductDetailsDelivery />
    </div>
  </main>
</template>
