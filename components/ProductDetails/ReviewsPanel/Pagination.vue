<script setup lang="ts">
const props = defineProps<{
  count: number
  elementToScroll: HTMLElement
}>()
const currentPage = ref(1)

const store = productDetailsStore()

type PageNumber = number
const reviewsPageMap = new Map<PageNumber, ReviewData['data']>()

const totalPagesRaw = props.count / store.reviewsPanel.perPage
const lastPage = Number.isInteger(totalPagesRaw) ? totalPagesRaw : Math.floor(totalPagesRaw) + 1

reviewsPageMap.set(currentPage.value, store.displayedReviews)

async function getReviewsPage(page: number) {
  if (page === 0 || page === lastPage + 1)
    return

  if (!reviewsPageMap.get(page)) {
    try {
      store.reviewsPanel.isLoadingMore = true
      const results = await $fetch<ReviewData>(`/product/${store.productId}/reviews`, {
        query: {
          page
        }
      })

      reviewsPageMap.set(page, results.data)

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
