<script setup lang="ts">
const { user } = toRefs(useUser())
</script>

<template>
  <div class="user-actions">
    <div>
      <NuxtLink v-if="!user.isLoggedIn" to="/login" data-login :no-prefetch="true">
        Sign in
      </NuxtLink>

      <NuxtLink v-if="!user.isLoggedIn" class="new-link" to="/register" :no-prefetch="true">
        New here? &nbsp;<span>Sign up</span>
      </NuxtLink>
      <ul>
        <li>
          <NuxtLink to="/account">
            Account
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/account/orders">
            Orders
          </NuxtLink>
        </li>

        <li v-if="user.isLoggedIn" class="action-logout" @click="requestLogout">
          <span>
            Logout
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
            <path d="M9 12h12l-3 -3"></path>
            <path d="M18 15l3 -3"></path>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>
