export async function requestLogout() {
  try {
    const user = useUser()

    await $fetch('/user/logout', { method: 'POST' })

    user.logout()
    return navigateTo('/', { external: true })
  }
  catch (error) {
    // TODO:
  }
}
