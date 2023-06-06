export default defineNuxtPlugin(() => {
  if (useRoute().fullPath.startsWith('/wishlist') || !useUser().user.isLoggedIn)
    return

  fetchWishlistIds()
})
