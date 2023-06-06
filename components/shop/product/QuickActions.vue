<script setup lang="ts">
const props = defineProps<{ product: Product }>()
const wishlist = wishlistStore()
const isInWishlist = computed(() => wishlist.ids.has(props.product.id))
</script>

<template>
  <div class="product-card__actions">
    <div class="product-card__action" @click="addToWishlist(product)">
      <IconsHeart v-if="isInWishlist" />
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
      </svg>
      <span>{{ isInWishlist ? 'Remove from wishlist' : 'Add to wishlist' }}</span>
    </div>
    <div class="product-card__action">
      <IconsQuickView />
      <span>Quick view</span>
    </div>
  </div>
</template>
