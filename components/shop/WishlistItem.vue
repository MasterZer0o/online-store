<script setup lang="ts">
defineProps<{ product: Product }>()
const showHeartIcon = ref(true)
</script>

<template>
  <li>
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" :viewBox=" showHeartIcon ? '0 0 512 512' : '0 0 24 24'" stroke-width="2" stroke="red" :fill="showHeartIcon ? 'white' : 'none'" stroke-linecap="round" stroke-linejoin="round" @mouseenter="showHeartIcon = false" @mouseleave="showHeartIcon = true" @click="removeFromWishlist(product.id)">
      <template v-if="showHeartIcon">
        <path d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" />
      </template>

      <template v-else>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 3l18 18"></path>
        <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572"></path>
      </template>
    </svg>
    <ShopTooltip text="Remove" />

    <img :src="product.productImage" :alt="product.name" width="80" height="80">
    <p>{{ product.name }}</p>
    <div class="wishlist-price">
      <span>{{ product.price.amount }} zł</span>

      <span v-if="product.price.discountLabel">
        <span class=":uno: text-green">{{ product.price.discountLabel }}
        </span>
        <strong>&nbsp;{{ product.price.discountedAmount }} zł</strong></span>
    </div>
  </li>
</template>
