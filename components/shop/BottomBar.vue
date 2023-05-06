<script setup lang="ts">
const store = useProducts()

const text = computed(() => {
  const currentPage = store.currentPage
  const totalPages = store.currentCategory.totalPages
  const productCount = store.products.length

  return `${totalPages === 1 ? productCount : (currentPage - 1) * 30}-${currentPage === totalPages ? (totalPages - 1) * 30 + productCount : (totalPages - 1) * 30}`
})
</script>

<template>
  <section class="listing-bottom-bar">
    <ShopSorting />
    <span v-if="store.currentCategory" class=":uno: ml-4 mr-8">{{ text }} z {{ store.currentCategory.productCount }}</span>
    <ShopBottomPagination />
  </section>
</template>
