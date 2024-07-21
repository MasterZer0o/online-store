<script setup lang="ts">
const props = defineProps<{
  totalCount: string
  averageRating: number
  initialData: ReviewData<true>
  fetchedData: boolean
}>()

const emit = defineEmits(['mounted'])
const mounted = ref(false)
const ready = ref(false)
const store = reviewsStore()
store.reviewRatingCounts[0] = +props.totalCount
store.totalCount = props.totalCount

const unwatch = watch(() => props.fetchedData, async (fetched) => {
  if (fetched) {
    store.displayedReviews = props.initialData.data

    store.setCachedReviews({ page: 1, rating: 0, reviews: props.initialData.data })

    store.reviewsPanel.perPage = props.initialData.perPage!

    Object.entries(props.initialData.counts).forEach(([_, v], index) => {
      store.reviewRatingCounts[(index + 1) as PossibleRating] = v
    })

    ready.value = true
    await nextTick()
    unwatch()
  }
}, { immediate: true })

onMounted(() => {
  emit('mounted')
  mounted.value = true
})

onUnmounted(() => store.resetReviews())
</script>

<template>
  <template v-if="store.displayedReviews.length !== 0 && mounted">
    <ProductDetailsReviewsPanelRating :average-rating="averageRating" />
    <ProductDetailsReviewsPanelReviews />
  </template>
</template>
