<script setup lang="ts">
definePageMeta({
  validate(route: any) {
    return !Number.isNaN(Number.parseInt(route.params.id))
  }
})

const productId = useRoute('p-id-product').params.id!

const { data: product, error } = await useLazyFetch<ProductDetails>(`/product/${productId}`)
logInfo(product.value)

// logInfo(data.value)

if (error.value?.data) {
  throw createError({
    message: error.value?.data.error.message || 'Page not found',
    statusCode: error.value?.data.error.statusCode,
    fatal: true
  })
}
// product.value = data.value
</script>

<template>
  <main class="product-details">
    <div>
      <ProductDetailsDisplay :image-src="product!.image" :name="product!.name" />
      <ProductDetailsImageGallery />
    </div>

    <div>
      <ProductDetailsPath />
      <ProductDetailsName :name="product!.name" />
      <ProductDetailsPriceAndRating :price="product!.price" :rating="product!.rating" />
      <ProductDetailsRating :rating="product!.rating" />
      <ProductDetailsConfiguration />
      <ProductDetailsBuy />
      <ProductDetailsDelivery />
    </div>
  </main>
</template>
