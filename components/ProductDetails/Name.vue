<script setup lang="ts">
// TODO: brand - now hardcoded
// TODO: make heart not filled - only filled when in fact in user's wishlist
// TODO: "xxx users likes this"  on hover on heart box
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
