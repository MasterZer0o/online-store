<script lang="ts" setup>
defineProps<{ nonav?: boolean;message?: string }>()
function clear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <ShopHeader v-if="!nonav" />
  <div class="page-not-found">
    <h1>{{ message || "PAGE NOT FOUND" }}</h1>

    <button type="button" @click="clear">
      Home
    </button>
    <picture>
      <source media="(min-width: 700px)" type="image/webp" srcset="~/assets/img/bg.webp">
      <source media="(max-width: 700px)" type="image/webp" srcset="~/assets/img/bgmob.webp">
      <source media="(max-width: 700px)" type="image/jpeg" srcset="~/assets/img/bgmob.jpg">
      <img src="~/assets/img/bg.jpg" alt="background image">
    </picture>
  </div>
</template>
