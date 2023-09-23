<script setup lang="ts">
defineProps<{
  price: ProductDetails['price']
  rating: ProductDetails['rating'] | null
  reviews: ProductDetails['reviewCount']
}>()

const emit = defineEmits(['openReviews'])
</script>

<template>
  <section class="details-price">
    <div class="price-amount">
      <strong>{{ price.discountedAmount || price.amount }} zł</strong>
      <div v-if="price.discountedAmount">
        <span class="price-amount--discounted">{{ price.amount }} zł</span>
        <span>{{ price.discountLabel }}</span>
      </div>
    </div>
    <ProductDetailsRating :review-count="reviews" :rating="rating" @open-reviews="emit('openReviews')" />
  </section>
</template>
