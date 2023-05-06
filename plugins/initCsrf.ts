export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    const res = nuxtApp.ssrContext?.event.node.res ?? {}

    if ('csrftoken' in res) {
      nuxtApp.payload.csrfToken = res.csrftoken
    }
  }
})
