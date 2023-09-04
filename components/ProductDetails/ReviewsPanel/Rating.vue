<script setup lang="ts">
const ratings = {
  average: 4.5,
  allRatings: 72,
  stars: [
    {
      label: '5',
      amount: 20
    },
    {
      label: '4',
      amount: 34
    },
    {
      label: '3',
      amount: 11
    },
    {
      label: '2',
      amount: 2
    },
    {
      label: '1',
      amount: 5
    },
  ]
}
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
        <span class=":uno: text-4xl font-semibold">{{ ratings.average }}</span>
        <IconsRatingStar :size="30" color="gold" />
      </div>
      <div>
        <ul>
          <li v-for="star in ratings.stars" :key="star.label">
            <span>{{ star.label }}</span>
            <div>
              <span :data-amount="star.amount" :style="{ width: `${(star.amount / ratings.allRatings * 100).toFixed(2)}%` }"></span>
            </div>
            <span>{{ (star.amount / ratings.allRatings * 100).toFixed(1) }}%</span>
          </li>
        </ul>
      </div>
    </div>
    <hr>
  </div>
</template>
