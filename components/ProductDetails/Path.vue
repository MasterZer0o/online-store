<script setup lang="ts">
// TODO: implement - now hardcoded
// TODO: add links to segments
const segments = ['test1', 'test2', 'test3', 'test4']
const lastSegmentIdx = segments.length - 1
</script>

<template>
  <section class="details-path">
    <div v-for="(segment, index) in segments" :key="segment">
      <span v-if="lastSegmentIdx !== index">{{ segment }}</span>
      <strong v-else>{{ segment }}</strong>
      <svg v-if="lastSegmentIdx !== index" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path d="M5.5 3.5L10.5 8.5L5.5 13.5" stroke="#A3A9C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </section>
</template>
