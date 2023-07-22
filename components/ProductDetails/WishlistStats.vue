<script setup lang="ts">
const props = defineProps<{ product: ProductDetails }>()
const store = wishlistStore()
onMounted(() => {
  store.currentlyViewedProductId = props.product.id
}
)
const count = ref(props.product.desiredCount)
const showRemove = ref(false)

function enter() {
  if (store.isCurrentProductIn)
    showRemove.value = true
}

function leave() {
  if (store.isCurrentProductIn)
    showRemove.value = false
}

async function updateWishlist() {
  try {
    const response = await addToWishlist(props.product) as { added: boolean }

    count.value = count.value + (response.added ? 1 : -1)

    showRemove.value = false
  }
  catch (error) {

  }
}
onUnmounted(() => store.currentlyViewedProductId = -1)
</script>

<template>
  <div @mouseenter="enter" @mouseleave="leave" @click="updateWishlist">
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>

      <template v-if="store.isCurrentProductIn">

        <template v-if="showRemove">
          <path d="M3 3l18 18"></path>
          <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572"></path>
        </template>

        <template v-else>
          <transition name="show-in" appear>
            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor"></path>
          </transition>

        </template>
      </template>

      <template v-else>
        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
      </template>

    </svg>
    <strong>{{ count }}</strong>
    <ShopTooltip v-if="count >= 2" :text="`${store.isCurrentProductIn ? `You and ${count - 1}` : `${count}`} others want it`" />
    <ShopTooltip v-else :text="store.isCurrentProductIn ? 'In your wishlist' : 'Add to wishlist'" />
  </div>
</template>
