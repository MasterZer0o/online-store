<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="product-discount">
    <span>{{ label }}</span>
  </div>
</template>
