<script setup lang="ts">
defineProps<{
  product: ProductDetails
}>()

const store = wishlistStore()
</script>

<template>
  <section class="details-buy">
    <button class="add-to-cart">
      <svg height="25" width="25" fill="currentColor" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><path d="M56.262,17.837H26.748c-0.961,0-1.508,0.743-1.223,1.661l4.669,13.677c0.23,0.738,1.044,1.336,1.817,1.336h19.35   c0.773,0,1.586-0.598,1.815-1.336l4.069-14C57.476,18.437,57.036,17.837,56.262,17.837z" /><circle cx="29.417" cy="50.267" r="4.415" /><circle cx="48.099" cy="50.323" r="4.415" /><path d="M53.4,39.004H27.579L17.242,9.261H9.193c-1.381,0-2.5,1.119-2.5,2.5s1.119,2.5,2.5,2.5h4.493l10.337,29.743H53.4   c1.381,0,2.5-1.119,2.5-2.5S54.781,39.004,53.4,39.004z" /></g><g /><g /><g /><g /><g /><g /></svg>
      Add To Cart
    </button>

    <button class="wishlist-btn" @click="addToWishlist(product)">
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path v-if="!store.isCurrentProductIn" d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
        <transition v-else name="show-in" appear>
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor"></path>
        </transition>

      </svg>
      <ShopTooltip :text="store.isCurrentProductIn ? 'In your wishlist' : 'Add to wishlist'" />
    </button>
  </section>
</template>
