<script setup lang="ts">
const userStore = useUser()
</script>

<template>
  <nav class="top-navbar">
    <ul>
      <li>
        <NuxtLink class="nav-link" to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="nav-link" to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="nav-link" to="/shop">
          Shop
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="nav-link" to="/account">
          Account
        </NuxtLink>
      </li>

      <LazyAdminNavLink v-if="userStore.user.role === 'admin'" />
    </ul>
    <ThemeSwitcher />
    <LazyNavAuthActionButtons v-if="!userStore.user.isLoggedIn" />
    <LazyNavUser v-else />
  </nav>
</template>
