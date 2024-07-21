<script setup lang="ts">
const collapsed = ref(false)

const listEl = ref<HTMLElement>()
onMounted(() =>
  listEl.value!.style.height = `${listEl.value!.clientHeight}px`
)
</script>

<template>
  <div class="filter-section">
    <div class="filter-section__title" @click="collapsed = !collapsed">
      <strong>Categories</strong>
      <svg :class="collapsed ? 'collapsed' : null" width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144" /></svg>
    </div>
    <transition name="collapse">
      <ul v-show="!collapsed" ref="listEl" class="filter-section__list">
        <li v-for="i in 5" :key="i">
          <label>
            <input class="check-option" type="checkbox">
            <span>test{{ i }}</span>
          </label>
          <span class="item-count">{{ i }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
