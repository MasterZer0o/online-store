<script setup lang="ts">
const props = defineProps<{
  count: number
  elementToScroll: HTMLElement
}>()
const currentPage = ref(1)

const store = productDetailsStore()

const reviewsPageMap = store.reviewsPageMap

const totalPagesRaw = props.count / store.reviewsPanel.perPage
const lastPage = Number.isInteger(totalPagesRaw) ? totalPagesRaw : Math.floor(totalPagesRaw) + 1

reviewsPageMap.set(currentPage.value, store.displayedReviews)

// rating===0 means no filtering
async function getReviewsPage(page: number, rating = 0) {
  if (page === 0 || page === lastPage + 1)
    return

  // TODO:
  const reviewsOfRating = store.reviewsPageMap2.get(rating)!
  if (reviewsOfRating.get(page)) {
    store.displayedReviews = reviewsOfRating.get(page)!
  }
  else {
    store.reviewsPanel.isLoadingMore = true
    const results = await fetchReviews({ productId: store.productId, page, rating, cid: store.reviewsCid })
    store.reviewsCid = results.cid
    const newResultsPage = new Map()
    newResultsPage.set(page, results.data)
    store.reviewsPageMap2.set(rating, newResultsPage)

    currentPage.value = page
  }

  if (!reviewsPageMap.get(page)) {
    try {
      store.reviewsPanel.isLoadingMore = true
      const results = await fetchReviews({ productId: store.productId, page, rating, cid: store.reviewsCid })

      reviewsPageMap.set(page, results.data)
      store.reviewsCid = results.cid

      currentPage.value = page
    }
    catch (error) {
      /* eslint-disable no-alert */
      alert('Error from fetching more reviews, check console.')
      logError(error)
    }
  }
  store.displayedReviews = reviewsPageMap.get(page)!
  store.reviewsPanel.isLoadingMore = false

  props.elementToScroll.scrollIntoView({ behavior: 'smooth' })
  currentPage.value = page
}
onUnmounted(() => {
  logInfo('UNMOUNTED')
})
</script>

<template>
  <section class="reviews-pagination">
    <button @click="getReviewsPage(currentPage - 1)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14" width="20" height="20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
      </svg>
    </button>
    <div>
      <button>{{ currentPage }}</button>
      <span>...</span>
      <button @click="getReviewsPage(lastPage)">
        {{ lastPage }}
      </button>
    </div>
    <button @click="getReviewsPage(currentPage + 1)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14" width="20" height="20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
      </svg>
    </button>
  </section>
</template>
