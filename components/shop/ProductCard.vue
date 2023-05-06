<script setup lang="ts">
defineProps<{ product: Product }>()
</script>

<template>
  <div class="product-card">
    <img :src="product.product_image" :alt="product.name">
    <div class="product-card__bottom">
      <div class="product-card__info">
        <span :title="product.name" class="product-card__title">{{ product.name }}</span>
      </div>

      <span class="product-card__price"><strong>{{ product.price }} zł</strong></span>
      <div class="buy-action">
        <button type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add to cart
        </button>
      </div>
    </div>
    <ShopProductActions />
  </div>
</template>
