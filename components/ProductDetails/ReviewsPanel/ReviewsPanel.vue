<script setup lang="ts">
defineProps<{ count: number }>()

const store = productDetailsStore()

const isOpen = ref(store.reviewsPanel.isOpen)
const overlayShow = ref(store.reviewsPanel.isOpen)
const isLoading = ref(true)
const aborted = ref(false)

function closeReviews() {
  aborted.value = true
  store.closeReviews()
}
const productId = useRoute('p-id-product').params.id

watch(toRefs(store.reviewsPanel).isOpen, async (opened) => {
  if (opened) {
    overlayShow.value = true
    isOpen.value = true

    if (aborted.value) {
      aborted.value = false
    }
    if (store.displayedReviews.length !== 0)
      return

    isLoading.value = true
    const response = await fetchInitialReviews(productId, aborted)
    store.displayedReviews = response?.data ?? []

    store.reviewsPanel.perPage = response?.perPage ?? 0
    isLoading.value = false
    return
  }

  isOpen.value = false

  setTimeout(() => overlayShow.value = false, 250)
})

onUnmounted(() => store.resetReviews())
</script>

<template>
  <div v-show="overlayShow" class="reviews-overlay" @click.self="closeReviews">
    <transition name="reviews-slide">
      <section v-show="isOpen" class="reviews-panel">
        <div v-if="isLoading" class="wrapper">
          <span class="loader"></span>
        </div>
        <template v-else>
          <ProductDetailsReviewsPanelRating />
          <ProductDetailsReviewsPanelReviews :count="count" />
        </template>

        <button @click="closeReviews">
          <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
          Close
        </button>
      </section>
    </transition>
  </div>
</template>
