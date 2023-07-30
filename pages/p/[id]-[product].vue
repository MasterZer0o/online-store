<script setup lang="ts">
const productId = useRoute('p-id-product').params.id

const { data: product, error } = await useFetch<ProductDetails>(`/product/${productId}`)

definePageMeta({
  validate(route: any) {
    return !Number.isNaN(Number.parseInt(route.params.id))
  }
})
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
</script>

<template>
  <main class="product-details">
    <div>
      <ProductDetailsDisplay :image-src="product!.image" :name="product!.name" />
      <ProductDetailsImageGallery :images="product!.images" />
    </div>

    <div>
      <ProductDetailsPath />
      <ProductDetailsName :product="product!" />
      <ProductDetailsPriceAndRating :price="product!.price" :rating="product!.rating" :reviews="product!.reviewCount" />
      <ProductDetailsConfiguration />
      <ProductDetailsBuy :stock="product!.stock" />
      <ProductDetailsDelivery />
    </div>
  </main>
</template>
