<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'

const store = useProducts()

const $primevue = usePrimeVue()
defineExpose({ // needed for ripple
  $primevue
})
</script>

<template>
  <section v-if="store.currentCategory.totalPages" class="pagination pagination-top">
    <button v-ripple title="previous page" type="button" class="prev-page p-ripple" :class="store.currentPage === 1 && 'disabled'" @click="previousPage">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
    </button>

    <input
      :value="store.currentPage" type="number" class="pagination__page-number" :placeholder="`${store.currentPage}`" :max="store.currentCategory.totalPages"
      :class="store.currentCategory.totalPages === 1 && 'disabled'"
      min="1" @input="pageFromInput($event as never, true as never)"
    >

    <span>z {{ store.currentCategory.totalPages }}</span>

    <button v-ripple type="button" class="next-page p-ripple" title="next page" :class="store.currentPage === store.currentCategory.totalPages && 'disabled'" @click="nextPage">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
    </button>
  </section>
</template>
