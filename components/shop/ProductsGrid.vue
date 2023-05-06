<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const products = useProducts()
</script>

<template>
  <section class="products-container">
    <div v-if="products.isLoadingProducts" class="mask">
      <div class="wrapper">
        <span class="loader"></span>
      </div>
    </div>
    <div v-if="products.isLoadingInitial" class="products-grid">
      <Skeleton v-for="i in 10" :key="i" width="230px" height="330px" />
    </div>

    <div v-else class="products-grid">
      <ShopProductCard v-for="product in products.products" :key="product.id" :product="product" />
    </div>
  </section>
</template>
