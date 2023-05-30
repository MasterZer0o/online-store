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
    <div v-if="products.isLoadingInitial" class=" products-grid">
      <Skeleton v-for="i in 10" :key="i" height="330px" />
    </div>

    <div v-if="!products.isLoadingInitial && products.products.length !== 0" class="products-grid">
      <ShopProductCard v-for="product in products.products" :key="product.id" :product="product" />
    </div>
  </section>

  <h3 v-if="products.products.length === 0" class=":uno: text-center py-20 mb-70">
    No products in this category.
  </h3>
</template>
