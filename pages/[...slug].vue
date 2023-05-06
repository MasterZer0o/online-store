<script setup lang="ts">
setResponseStatus(404, 'Page not found')
definePageMeta({
  title: 'Page not found'
})
</script>

<template>
  <!-- <div class="page-not-found">
    <h1>PAGE NOT FOUND</h1>
    <NuxtLink to="/">
      Home
    </NuxtLink>
    <picture>
      <source media="(min-width: 700px)" type="image/webp" srcset="~/assets/img/bg.webp">
      <source media="(max-width: 700px)" type="image/webp" srcset="~/assets/img/bgmob.webp">
      <source media="(max-width: 700px)" type="image/jpeg" srcset="~/assets/img/bgmob.jpg">
      <img src="~/assets/img/bg.jpg" alt="background">
    </picture>
  </div> -->
  <NuxtLayout name="404" :nonav="true" />
</template>
