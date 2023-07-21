<script setup lang="ts">
const props = defineProps<{ product: Product }>()

logInfo(props)
</script>

<template>
  <article class="product-card">
    <ShopProductQuickActions :product="product" />
    <NuxtLink :to="product.uri">
      <ShopProductDiscount v-if="product.price.discountLabel" :label="product.price.discountLabel" />
      <img :src="product.image" :alt="product.name" height="400">
      <div class="product-card__bottom">
        <div class="product-card__info">
          <span :title="product.name" class="product-card__title">{{ product.name }}</span>
        </div>

        <span v-if="!product.price.discountedAmount" class="product-card__price"><strong>{{ product.price.amount }} zł</strong></span>
        <span v-else class="product-card__price">
          <span :title="`${product.price.amount}`" class=":uno: line-through">{{ product.price.amount }} zł</span>
          &nbsp;<strong>{{ product.price.discountedAmount }} zł</strong></span>
      </div>
    </NuxtLink>
  </article>
</template>
