export async function requestLogout() {
  try {
    const user = useUserStore()

    await $fetch('/user/logout', { method: 'POST' })
    user.logout()
    await navigateTo('/')
    window.location.reload()
  }
  catch (error) {
    // TODO:
  }
}
