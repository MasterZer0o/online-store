<script setup lang="ts">
import { sendRedirect } from 'h3'

definePageMeta({
  title: 'Login',
  pageTransition: {
    name: 'login',
    leaveActiveClass: 'login',
  },
  middleware: 'logged-in'
})

const store = useUser()

const event = useRequestEvent()

if (store.user.isLoggedIn) {
  if (process.server)
    await sendRedirect(event, '/')
}
else {
  if (process.server) {
    const session = event.context.sessions![useRuntimeConfig().SESSION_COOKIE_NAME]
    store.redirectURL = session.data.redirectURL
  }
}
</script>

<template>
  <section class="main-wrapper">
    <LoginBox />
  </section>
</template>
