<script setup lang="ts">
const props = defineProps<{ elementToScroll: HTMLElement }>()

const store = reviewsStore()
async function fetchWithRating(rating: PossibleRating) {
  props.elementToScroll.scrollIntoView({ behavior: 'smooth' })
  await loadReviews({ page: 1, rating })
  store.reviewsPage = 1
}
</script>

<template>
  <div class="star-dropdown">
    <button>
      {{ store.reviewsRatingFilter !== 0 ? store.reviewsRatingFilter : '' }} <svg
        viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="15" width="15"
        :fill="store.reviewsRatingFilter !== 0 ? '#dfc01b' : '#ffffff95'"
      ><path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" /></svg>
    </button>
    <ul>
      <li :class="{ active: store.reviewsRatingFilter === 0 }" @click="fetchWithRating(0)">
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="15" width="15" fill="#ffffff95"><path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" /></svg>
        <span>{{ store.totalCount }}</span>
      </li>
      <li v-for="starAmount in 5" :key="starAmount" :class="{ active: store.reviewsRatingFilter === starAmount }" @click="fetchWithRating(starAmount as PossibleRating)">
        {{ starAmount }}
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" height="17" width="17" fill="#ffffff95"><path d="M239.2,97.4A16.4,16.4,0,0,0,224.6,86l-59.4-4.1-22-55.5A16.4,16.4,0,0,0,128,16h0a16.4,16.4,0,0,0-15.2,10.4L90.4,82.2,31.4,86A16.5,16.5,0,0,0,16.8,97.4,16.8,16.8,0,0,0,22,115.5l45.4,38.4L53.9,207a18.5,18.5,0,0,0,7,19.6,18,18,0,0,0,20.1.6l46.9-29.7h.2l50.5,31.9a16.1,16.1,0,0,0,8.7,2.6,16.5,16.5,0,0,0,15.8-20.8l-14.3-58.1L234,115.5A16.8,16.8,0,0,0,239.2,97.4Z" /></svg>
        <span>({{ store.reviewRatingCounts[starAmount as PossibleRating] }})</span>
      </li>
    </ul>
  </div>
</template>
