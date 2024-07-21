<script setup lang="ts">
definePageMeta({
  middleware: 'admin-only',
  layout: 'dashboard',
  title: 'Admin',
  pageTransition: {
    name: 'admin-page',
    appear: true
  }
})
</script>

<template>
  <h1>Index page</h1>
</template>

<style lang="scss">
@use "@/assets/styles/admin_main.scss";
</style>
