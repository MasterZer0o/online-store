<script setup lang="ts">
// TODO: brand - now hardcoded
// TODO: make heart not filled - only filled when in fact in user's wishlist
// TODO: "xxx users likes this"  on hover on heart box
defineProps<{ product: ProductDetails }>()
</script>

<template>
  <section class="details-name">
    <div>
      <p>
        {{ product.name }}
      </p>
      <ProductDetailsWishlistStats :product="product" />
    </div>
    <p>Random brand name</p>
  </section>
</template>
