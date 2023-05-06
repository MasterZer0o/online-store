<script setup lang="ts">
const store = useProducts()
</script>

<template>
  <div class="top-bar">
    <div class="listing-name">
      <h2> {{ store.currentCategory.name }}</h2>
      <span>{{ store.cid ? `(${store.currentCategory.productCount})` : "" }}</span>
    </div>

    <div class="top-bar__row">
      <ShopProductView />
      <ShopSorting />
      <ShopTopPagination />
    </div>
  </div>
</template>
