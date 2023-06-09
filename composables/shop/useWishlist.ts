export async function fetchWishlist() {
  const store = wishlistStore()

  const wishlist = await $fetch('/user/wishlist') as Product[] | { error: string }

  if ('error' in wishlist) {
    store.error = wishlist.error
    return
  }

  store.items = new Map(wishlist.map(item => [item.id, item]))
  store.ids = new Set(wishlist.map(item => item.id))
}

export function fetchWishlistIds() {
  const store = wishlistStore()
  $fetch('/user/wishlist', {
    query: {
      get: 'id'
    }
  }).then((res) => {
    if (!('error' in res)) {
      store.ids = new Set(res as number[])
    }
  }).catch(err => () => store.error = err)
}

export async function addToWishlist(product: Product) {
  const store = wishlistStore()
  const user = useUser()

  if (!user.user.isLoggedIn) {
    user.redirectURL = useRoute().fullPath
    user.loginCallback = { fn: addToWishlist, args: [product] }
    return navigateTo('/login')
  }

  if (isInWishlist(product.id))
    return removeFromWishlist(product.id)

  await $fetch('/user/wishlist', {
    method: 'POST',
    body: {
      productId: product.id
    }
  })

  store.ids.add(product.id)
  console.log('Added ', product, ' to wishlist')
}

function isInWishlist(productId: Product['id']) {
  const store = wishlistStore()

  return store.ids.has(productId)
}

export async function removeFromWishlist(productId: Product['id']) {
  const store = wishlistStore()

  const user = useUser()

  if (!user.user.isLoggedIn) {
    user.redirectURL = useRoute().path
    user.loginCallback = { fn: removeFromWishlist, args: [productId] }

    return navigateTo('/login')
  }

  await $fetch('/user/wishlist', {
    method: 'DELETE',
    body: {
      productId
    }
  })

  store.ids.delete(productId)
  store.items.delete(productId)
  console.log('Removed ', productId, ' from wishlist')
}
