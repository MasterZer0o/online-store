<script setup lang="ts">
// import { usePrimeVue } from 'primevue/config'

import SidebarItem from './SidebarItem.vue'

// const $primevue = usePrimeVue()
// defineExpose({
//   $primevue
// })
const isOpened = ref(true)

const tooltipText = computed(() => isOpened.value ? 'Close sidebar' : 'Open sidebar')
</script>

<template>
  <div v-if="!isOpened" class="close-sidebar closed" :data-text="tooltipText">
    <IconsDoubleArrow style="transform: rotate(180deg);" @click="isOpened = !isOpened" />
  </div>

  <transition name="sidebar-slide">
    <aside v-show="isOpened" class="admin-sidebar">
      <div class="close-sidebar" :data-text="tooltipText">
        <IconsDoubleArrow @click="isOpened = !isOpened" />
      </div>
      <div class="admin-sidebar__header">
      </div>

      <div class="admin-sidebar__menu">
        <ul>
          <SidebarItem link-to="/admin/tables" label="Tables">
            <IconsTable />
          </SidebarItem>

          <SidebarItem link-to="/admin/users" label="Users">
            <IconsUser />
          </SidebarItem>

          <SidebarItem link-to="/admin/2" label="Link1" />
          <SidebarItem link-to="/admin/" label="Link1" />
        </ul>
      </div>
    </aside>
  </transition>
</template>
