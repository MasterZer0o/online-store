<script setup lang="ts">
defineProps<{
  imageSrc: string
  name: string
}>()
</script>

<template>
  <section class="details-display">
    <img :src="imageSrc" :alt="name" width="400" height="350">
  </section>
</template>
