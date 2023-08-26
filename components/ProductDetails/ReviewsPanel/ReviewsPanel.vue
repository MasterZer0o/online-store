<script setup lang="ts">
const reviews = inject<{ open: () => any; isOpen: Ref<boolean> }>('reviewsOpen')!

const isOpen = ref(false)
const overlayShow = ref(false)

function closeReviews() {
  reviews.isOpen.value = false
}

watch(reviews.isOpen, (opened) => {
  if (opened) {
    overlayShow.value = true
    isOpen.value = true
    return
  }

  isOpen.value = false

  setTimeout(() => overlayShow.value = false, 250)
})
</script>

<template>
  <div v-show="overlayShow" class="reviews-overlay" @click.self="closeReviews">
    <transition name="reviews-slide">
      <section v-show="isOpen" class="reviews-panel">
        <button @click="closeReviews">
          <svg width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
          </svg>
        </button>
      </section>
    </transition>
  </div>
</template>
