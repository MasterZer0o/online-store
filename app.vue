<script setup lang="ts">
const route = useRoute()
useHead({
  title: () => route.meta.title as string || 'Home'
})

const store = useUser()

const nuxtApp = useNuxtApp()

const isLoadingPage = ref(false)
nuxtApp.hook('page:start', () => {
  isLoadingPage.value = true
})

nuxtApp.hook('page:finish', () => {
  setTimeout(() => isLoadingPage.value = false, 400)
})

if (process.server) {
  const event = useRequestEvent()
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
  <NuxtLoadingIndicator
    color="linear-gradient(to right, red, yellow, red,yellow, red)"
    :height="2" :duration="2000" :style="`opacity:${isLoadingPage ? 1 : 0};`"
  />
  <ShopHeader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
