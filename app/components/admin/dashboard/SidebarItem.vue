<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'

defineProps<{
  linkTo: string
  label: string
}>()

const $primevue = usePrimeVue()
defineExpose({ // needed for ripple
  $primevue
})
</script>

<template>
  <li v-ripple class="p-ripple">
    <NuxtLink :to="linkTo">
      <slot />
      {{ label }}
    </NuxtLink>
  </li>
</template>
