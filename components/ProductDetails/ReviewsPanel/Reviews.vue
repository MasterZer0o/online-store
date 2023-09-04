<script setup lang="ts">
defineProps<{ count: string;reviews: Awaited<ReturnType<typeof fetchReviews>> }>()
</script>

<template>
  <ProductDetailsReviewsPanelPagination />
  <div class=":uno: flex items-center">
    <p class=":uno: text-2xl my-3">
      User Reviews <span class=":uno: text-lg">({{ count }})</span>
    </p>
    <ProductDetailsReviewsPanelStarsFilterDropdown />
  </div>
  <section class="reviews-content">
    <ProductDetailsReviewsPanelReview v-for="review in reviews" :key="review.username" :review="review" />
  </section>
</template>
