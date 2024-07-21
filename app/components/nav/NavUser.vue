<script setup lang="ts">
const store = useUser()
const dropdown = ref<HTMLElement>()
const selectedElement = ref<HTMLElement>()
function hide(element: any) {
  if (element.target === selectedElement.value)
    return

  selectedElement.value = element.target
  dropdown.value!.style.visibility = 'hidden'
  setTimeout(() => dropdown.value!.removeAttribute('style'), 10)
}
</script>

<template>
  <div class="nav-user">
    <span class="nav-user__username">{{ store.user.username }}
      <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144 144-144" /></svg>
    </span>

    <ul ref="dropdown" class="nav-user__dropdown">
      <li @click="hide">
        <NuxtLink to="/account">
          Account
        </NuxtLink>
      </li>
      <li @click="hide">
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li @click="requestLogout(), hide">
        Logout
      </li>
    </ul>
  </div>
</template>
