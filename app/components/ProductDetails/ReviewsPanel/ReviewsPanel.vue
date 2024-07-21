<script setup lang="ts">
const props = defineProps<{
  totalCount: string
  averageRating: number
  openState: boolean
}>()

const emit = defineEmits(['closePanel'])

const isOpen = ref(false)
const overlayShow = ref(false)
const isLoadingData = ref(true)
const didAbort = ref(false)

const productId = useRoute('p-id-product').params.id
const mounted = ref(false)
const fetched = ref(false)

function closeReviews() {
  didAbort.value = true
  emit('closePanel')

  isOpen.value = false
  setTimeout(() => overlayShow.value = false, 250)
}

const shouldImportComponent = ref(false)

const initialData = ref<ReviewData<true>>()

watch(() => props.openState, async (opened) => {
  if (!opened) {
    closeReviews()
    return
  }

  overlayShow.value = true
  isOpen.value = true

  if (didAbort.value) {
    didAbort.value = false
  }

  if (initialData.value !== undefined)
    return

  isLoadingData.value = true
  shouldImportComponent.value = true

  const { fetchInitialReviews } = await import('~/composables/shop/fetchReviews')
  if (didAbort.value)
    return

  const response = await fetchInitialReviews(didAbort, productId)
  initialData.value = response
  fetched.value = true
  isLoadingData.value = false
})
</script>

<template>
  <div v-show="overlayShow" class="reviews-overlay" @click.self="closeReviews">
    <transition name="reviews-slide">
      <section v-show="isOpen" class="reviews-panel">
        <div v-if="isLoadingData || !mounted" class="wrapper">
          <span class="loader"></span>
        </div>
        <LazyProductDetailsReviewsPanelContent
          v-if="shouldImportComponent"
          :initial-data="initialData!"
          :total-count="totalCount"
          :average-rating="averageRating"
          :fetched-data="fetched"
          @mounted="mounted = true"
        />

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
