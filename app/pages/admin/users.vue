<script setup lang="ts">
definePageMeta({
  title: 'User management',
  layout: 'dashboard',
  middleware: 'admin-only',
  pageTransition: {
    name: 'admin-page',
    appear: true
  }
})
</script>

<template>
  <h1>USERS PAGE</h1>
</template>
