<script setup lang="ts">
defineProps<{
  price: ProductDetails['price']
  rating: ProductDetails['rating'] | null
  reviews: ProductDetails['reviewCount']
}>()
</script>

<template>
  <section class="details-price">
    <div class="price-amount">
      <strong>{{ price.discountedAmount || price.amount }} zł</strong>
      <span v-if="price.discountedAmount" class="price-amount--discounted">{{ price.amount }} zł</span>
    </div>
    <ProductDetailsRating :review-count="reviews" :rating="rating" />
  </section>
</template>
