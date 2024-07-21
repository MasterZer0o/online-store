<script setup lang="ts">
const props = defineProps<{
  rating: ProductDetails['rating'] | null
  reviewCount: ProductDetails['reviewCount']
}>()

const emit = defineEmits(['openReviews'])
function openReviews() {
  if (props.reviewCount === '0')
    return

  emit('openReviews')
}
</script>

<template>
  <div class="details-rating">
    <div>
      <IconsRatingStar />
      <strong>{{ rating?.toFixed(2) ?? 'No ratings' }}</strong>
    </div>
    <div @click="openReviews">
      <IconsReviews />
      <strong>{{ reviewCount }} Reviews</strong>
    </div>
  </div>
</template>
