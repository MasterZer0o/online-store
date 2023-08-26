<script setup lang="ts">
const props = defineProps<{
  rating: ProductDetails['rating'] | null
  reviewCount: ProductDetails['reviewCount']
}>()
const reviews = inject<{ open: () => any; isOpen: Ref<boolean> }>('reviewsOpen')!

function openReviews() {
  if (props.reviewCount === 0)
    return

  reviews.open()
}
</script>

<template>
  <div class="details-rating">
    <div>
      <IconsRatingStar />
      <strong>{{ rating ?? 'No rating' }}</strong>
    </div>
    <div @click="openReviews">
      <IconsReviews />
      <strong>{{ reviewCount }} Reviews</strong>
    </div>
  </div>
</template>
