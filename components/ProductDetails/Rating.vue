<script setup lang="ts">
const props = defineProps<{
  rating: ProductDetails['rating'] | null
  reviewCount: ProductDetails['reviewCount']
}>()
const { openReviews: openReviewsPanel } = productDetailsStore()

// const reviews = inject<{ open: () => any; isOpen: Ref<boolean> }>('reviewsOpen')!

function openReviews() {
  if (props.reviewCount === 0)
    return

  openReviewsPanel()
}
</script>

<template>
  <div class="details-rating">
    <div>
      <IconsRatingStar />
      <strong>{{ rating?.toFixed(2) ?? 'No rating' }}</strong>
    </div>
    <div @click="openReviews">
      <IconsReviews />
      <strong>{{ reviewCount }} Reviews</strong>
    </div>
  </div>
</template>
