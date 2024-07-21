export async function requestLogin({ login, password, remember }: { login: string; password: string;remember?: boolean }): Promise<LoginResponse> {
  try {
    const store = useUser()
    const { csrf } = useCsrf()

    const response = await $fetch('/user/login', {
      method: 'POST',
      body: { login, password, remember },
      headers: {
        'X-CSRF': csrf
      }
    })

    if (!('error' in response)) {
      store.user.isLoggedIn = true

      if (response.role)
        store.user.role = response.role

      store.user.username = response.username

      if (store.loginCallback) {
        store.loginCallback.fn(...store.loginCallback.args)
      }

      await navigateTo(store.redirectURL ?? '/', { replace: true })
      store.redirectURL = null

      if (useRoute().fullPath.startsWith('/wishlist'))
        fetchWishlistIds()
    }

    return response
  }
  catch (error) {
    return {
      status: 'Error occurred',
      error: true
    }
  }
}
