<script setup lang="ts">
const topbar = ref<HTMLElement>()
const store = useUser()
const items = ref([
  {
    label: 'Update',
  },
  {
    label: 'Delete',
  },
  {
    label: 'Vue Website',
  },
  {
    label: 'Upload',
    to: '/'
  }
])

const menu = ref()
function toggleMenu(event: any) {
  menu.value.toggle(event)
}
</script>

<template>
  <section ref="topbar" class="admin-topbar">
    <div class="user-menu-btn">
      <Button class="p-button-outlined p-ripple" @click="toggleMenu">
        <span>{{ store.user.username }}</span>
        <IconsChevron />
      </Button>
      <Menu ref="menu" :append-to="`.${topbar?.className}`" :model="items" :popup="true" @mouseleave="toggleMenu" />
    </div>
  </section>
</template>
