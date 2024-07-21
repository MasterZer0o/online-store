<script setup lang="ts">
const store = useProducts()
const isOpen = ref<boolean>(false)
function handleDropdown() {
  isOpen.value = !isOpen.value
}
const sortingOptions = [
  {
    text: 'Popularity',
    handler() { store.sortingOption = this.text }
  },
  {
    text: 'Price: high to low',
    handler() { store.sortingOption = this.text }
  },
  {
    text: 'Price: low to high',
    handler() { store.sortingOption = this.text }
  }
]
store.sortingOption = sortingOptions[0].text
// todo: add handlers
function hideDropdown() {
  isOpen.value = false
}
</script>

<template>
  <div class="sorting" :class="!isOpen || 'shown'">
    <button class="wrapper" @click="handleDropdown">
      {{ store.sortingOption }}
      <IconsChevronDown />
    </button>
    <ul v-show="isOpen">
      <li
        v-for="option in sortingOptions" :key="option.text" :class="option.text === store.sortingOption ? 'sorting-selected' : null"
        @click="option.handler(), hideDropdown()"
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>
