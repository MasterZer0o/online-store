<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps < { error: NuxtError }>()

const event = useRequestEvent()
if (process.server && event.context.user) {
  const store = useUserStore()
  store.user.username = event.context.user.username
  store.user.isLoggedIn = true
  store.user.role = event.context.user.role
}
const layoutName = props.error?.statusCode === 404 ? '404' : 'default'

if (process.server) {
  const { SESSION_COOKIE_NAME } = useRuntimeConfig()
  const { data: sessionData }: { data: Partial<ClientSessionData> } = event.context.sessions![SESSION_COOKIE_NAME]
  const store = useUserStore()

  if (sessionData.user) {
    if (sessionData.user) {
      store.user.username = sessionData.user.username
      store.user.role = sessionData.user.role
      store.user.isLoggedIn = true
    }
  }
}
</script>

<template>
  <Head>
    <Title>{{ error?.message || "Error" }}</Title>
  </Head>
  <TheNavbar v-if="layoutName !== '404'" />

  <NuxtLayout v-if="error?.statusCode === 404" name="404" :message="props.error.message" />
  <div v-else>
    <h1>Error page</h1>
  </div>

  <DevOnly>
    <div style="position: absolute;bottom: 0;width: 100%;">
      <div style="width: 80%;margin: auto;">
        <h2 style="display: block; color: white;">
        DEV-ONLY LOG
      </h2>
      <pre style="margin: auto;font-size: clamp(14px,1.5vw ,1.5em);background-color: var(--bg2);opacity:.8;padding: 1em;border-radius: 4px;">{{ error }}
      </pre>
      </div>
    </div>
  </DevOnly>
</template>
