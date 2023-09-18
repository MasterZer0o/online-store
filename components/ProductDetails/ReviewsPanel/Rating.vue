<script setup lang="ts">
defineProps<{ averageRating: number }>()
const store = productDetailsStore()
async function fetchWithStars(rating: PossibleRating) {
  store.reviewsCid = undefined

  await loadReviews({ page: 1, rating })
  store.reviewsPage = 1
}
const entries = Object.entries(store.reviewRatingCounts)
const totalCount = +store.totalCount
const arr: number[] = []
for (let i = 1; i <= 5; i++) {
  arr.push(entries[i][1])
}
arr.reverse()
</script>

<template>
  <div class="reviews-rating">
    <div class="header">
      <span class=":uno: text-2xl">Ratings</span>
      <button>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
        </svg>
        Add Review
      </button>
    </div>
    <div class="cols">
      <div>
        <span class=":uno: text-4xl font-semibold">{{ averageRating.toFixed(1) }}</span>
        <IconsRatingStar :size="30" color="gold" />
      </div>
      <div>
        <ul>
          <li v-for="amount, i in arr" :key="i">
            <span>{{ arr.length - i }}</span>
            <div @click="fetchWithStars(arr.length - i as PossibleRating)">
              <span
                :data-amount="amount"
                :style="{ width: `${(amount / totalCount * 100).toFixed(2)}%` }"
              ></span>
            </div>
            <span>{{ (amount / totalCount * 100).toFixed(1) }}%</span>
          </li>
        </ul>
      </div>
    </div>
    <hr>
  </div>
</template>
