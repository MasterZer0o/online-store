<script setup lang="ts">
// TODO: brand - now hardcoded
defineProps<{ name: ProductDetails['name'] }>()
</script>

<template>
  <section class="details-name">
    <div>
      <p>
        {{ name }}
      </p>
      <span>
        <IconsHeart /><strong>109</strong>
      </span>
    </div>
    <p>Random brand name</p>
  </section>
</template>
