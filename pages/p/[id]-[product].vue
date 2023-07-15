<script setup lang="ts">
definePageMeta({
  validate(route: any) {
    return !Number.isNaN(Number.parseInt(route.params.id))
  }
})

const productId = useRoute('p-id-product').params.id!

const response = await useFetch(`/product/${productId}`)
// info(response.data.value)

if (response.error.value?.data) {
  throw createError({
    message: response.error.value?.data.error.message || 'Page not found',
    statusCode: response.error.value?.data.error.statusCode,
    fatal: true
  })
}
</script>

<template>
  <main class="product-details">
    <div>
      <ProductDetailsDisplay />
    </div>

    <div>
      <ProductDetailsPath />
      <ProductDetailsName />
      <ProductDetailsPrice />
      <ProductDetailsConfiguration />
      <ProductDetailsBuy />
      <ProductDetailsDelivery />
    </div>
  </main>
</template>
