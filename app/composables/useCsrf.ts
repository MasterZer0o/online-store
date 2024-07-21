export function useCsrf() {
  const nuxtApp = useNuxtApp()

  return { csrf: nuxtApp.payload.csrfToken as string }
}
