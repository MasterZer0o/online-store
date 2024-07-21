<script setup lang="ts">
const { review } = defineProps<{
  review: ReviewData['data'][number]
}>()

const postedAt = new Date(review.postedAt).toLocaleDateString(navigator?.language || 'en').replaceAll('/', '.')
</script>

<template>
  <article>
    <div>
      <span>{{ review.username }}</span>
      <ProductDetailsReviewsPanelReviewStars :rating="review.rating" />
    </div>
    <p class=":uno: text-sm">
      {{ review.comment }}
    </p>
    <span>{{ postedAt }}</span>
  </article>
</template>
