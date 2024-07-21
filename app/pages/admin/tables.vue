<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin-only',
  pageTransition: {
    name: 'admin-page',
    appear: true
  }
})
</script>

<template>
  <h1>test tables</h1>
</template>
