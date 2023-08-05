<script setup lang="ts">
// TODO: brand - now hardcoded
defineProps<{ product: ProductDetails }>()
</script>

<template>
  <section class="details-name">
    <div>
      <p>
        {{ product.name }}
      </p>
      <!-- <ProductDetailsWishlistStats :product="product" /> -->
    </div>
    <p>Random brand name</p>
  </section>
</template>
