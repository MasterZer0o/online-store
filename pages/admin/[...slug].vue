<script setup lang="ts">
definePageMeta({
  middleware: 'admin-only',
  layout: 'dashboard'

})
</script>

<template>
  <h1>{{ $route.fullPath }}</h1>
</template>
