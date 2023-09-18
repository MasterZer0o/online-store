<script setup lang="ts">
const props = defineProps<{
  elementToScroll: HTMLElement
}>()
const store = productDetailsStore()

// rating===0 means no filtering
async function getReviewsPage(page: number) {
  if (page === 0 || page === store.totalPages + 1)
    return

  const cachedReviews = store.getCachedReviews({ page })
  if (cachedReviews) {
    store.displayedReviews = cachedReviews
  }
  else {
    store.reviewsPanel.isLoadingMore = true
    if (page < store.reviewsPage) {
      store.reviewsCid = undefined
    }
    const results = await fetchReviews({ page })
    store.reviewsCid = results.cid

    store.displayedReviews = results.data

    store.setCachedReviews({ page, rating: store.reviewsRatingFilter, reviews: results.data })
  }
  store.reviewsPage = page

  store.reviewsPanel.isLoadingMore = false

  props.elementToScroll.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="reviews-pagination">
    <button :class="{ disabled: store.reviewsPage === 1 }" @click="getReviewsPage(store.reviewsPage - 1)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14" width="20" height="20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
      </svg>
    </button>
    <div>
      <button>{{ store.reviewsPage }}</button>
      <span>...</span>
      <button @click="getReviewsPage(store.totalPages)">
        {{ store.totalPages }}
      </button>
    </div>
    <button :class="{ disabled: store.reviewsPage === store.totalPages }" @click="getReviewsPage(store.reviewsPage + 1)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14" width="20" height="20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
      </svg>
    </button>
  </section>
</template>
