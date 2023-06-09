<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'
import { nextPage, pageFromInput, previousPage } from '@/composables/shop/pageHandler'

const $primevue = usePrimeVue()
defineExpose({ // needed for ripple
  $primevue
})

const store = useProducts()
const route = useRoute()
const URL = route.path

const visiblePages = computed(() => {
  if (store.currentCategory.totalPages === 1)
    return [1]

  const pageNumber = store.currentPage
  if (pageNumber === 1)
    return [pageNumber, pageNumber + 1, pageNumber + 2]

  if (pageNumber === store.currentCategory.totalPages)
    return [pageNumber - 2, pageNumber - 1, pageNumber]

  return [pageNumber - 1, pageNumber, pageNumber + 1]
})

async function fromPagination(page: number) {
  if (page === store.currentPage)
    return

  store.currentPage = page

  store.resetCursor()

  scrollTop()
  await goToPage(page)
}

function scrollTop() {
  window.scrollTo(0, 0)
}
const isDisabled = computed(() => {
  return store.currentPage === 1 && 'disabled'
})
</script>

<template>
  <section v-if="store.currentCategory" class="pagination pagination-bottom">
    <button v-ripple title="previous page" type="button" class="prev-page p-ripple" :class="isDisabled" @click="previousPage(), scrollTop()">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
    </button>

    <div
      v-for="pageValue in visiblePages" :key="pageValue"
      class="page-circle"
      :class="pageValue === store.currentPage && 'current-page'"
    >
      <NuxtLink :to="`${URL}?page=${pageValue}`" @click="fromPagination(pageValue)">
        {{ pageValue }}
      </NuxtLink>
    </div>

    <input
      type="number" class="pagination__page-number"
      placeholder="nr"
      min="1"
      :max="store.currentCategory.totalPages"
      :class="isDisabled"
      @input="pageFromInput($event, true)"
    >

    <div
      class="page-circle"
      :class="store.currentPage === store.currentCategory.totalPages && 'disabled'"
    >
      <NuxtLink :to="`${URL}?page=${store.currentCategory.totalPages}`" @click="fromPagination(store.currentCategory.totalPages)">
        {{ store.currentCategory.totalPages }}
      </NuxtLink>
    </div>

    <button
      v-ripple type="button" class="next-page p-ripple"
      title="next page"
      :class="store.currentPage === store.currentCategory.totalPages && 'disabled'"
      @click="nextPage(), scrollTop()"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
    </button>
  </section>
</template>
