<script setup lang="ts">
const elementToScroll = ref() as Ref<HTMLElement>
const store = reviewsStore()
</script>

<template>
  <div ref="elementToScroll" class=":uno: flex items-center">
    <p class=":uno: text-2xl my-3">
      User Reviews <span class=":uno: text-lg">({{ store.filteredReviewsCount }})</span>
    </p>
    <ProductDetailsReviewsPanelStarsFilterDropdown :element-to-scroll="elementToScroll" />
  </div>
  <section class="reviews-content">
    <div v-if="store.reviewsPanel.isLoadingMore" class="overlay">
      <span class="loader"></span>
    </div>
    <ProductDetailsReviewsPanelReview v-for="review in store.displayedReviews" :key="review.id" :review="review" />
  </section>
  <ProductDetailsReviewsPanelPagination :element-to-scroll="elementToScroll" />
</template>
