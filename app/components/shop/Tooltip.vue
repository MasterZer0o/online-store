<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <span class="tooltip" :data-text="text"></span>
</template>
