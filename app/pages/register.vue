<script setup lang="ts">
definePageMeta({
  title: 'Register',
  pageTransition: {
    name: 'login',
    leaveActiveClass: 'login',
    appear: true,
    mode: 'out-in'
  }
})
</script>

<template>
  <section class="main-wrapper">
    <RegisterBox />
  </section>
</template>
