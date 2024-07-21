<script setup lang="ts">
setResponseStatus(useRequestEvent(), 404, 'Page not found')
definePageMeta({
  title: 'Page not found'
})
</script>

<template>
  <NuxtLayout name="404" :nonav="true" />
</template>
