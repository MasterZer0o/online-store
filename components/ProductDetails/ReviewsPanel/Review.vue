<script setup lang="ts">
const { review } = defineProps<{
  review: NonNullable<Awaited<ReturnType<typeof fetchReviews>>>[number]
}>()

const stars = {
  full: Math.floor(review.rating),
  half: review.rating.toString().endsWith('.5') ? 1 : 0
}

const postedAt = new Date(review.postedAt).toLocaleDateString(navigator?.language || 'en').replaceAll('/', '.')
</script>

<template>
  <article>
    <div>
      <span>{{ review.username }}</span>
      <ProductDetailsReviewsPanelReviewStars :full="stars.full" :half="stars.half" />
    </div>
    <p class=":uno: text-sm">
      {{ review.comment }}
    </p>
    <span>{{ postedAt }}</span>
  </article>
</template>
