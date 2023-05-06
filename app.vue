<script setup lang="ts">
const route = useRoute()
useHead({
  title: () => route.meta.title as string || 'Home'
})

const store = useUserStore()
const event = useRequestEvent()

if (process.server) {
  const { SESSION_COOKIE_NAME } = useRuntimeConfig()

  const { data: sessionData }: { data: Partial<ClientSessionData> } = event.context.sessions![SESSION_COOKIE_NAME]
  if (sessionData.user) {
    store.user.username = sessionData.user.username
    store.user.role = sessionData.user.role
    store.user.isLoggedIn = true
  }
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
