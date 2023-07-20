export default defineNuxtPlugin({
  parallel: true,
  async setup() {
    if (useRoute().fullPath.startsWith('/wishlist') || !useUser().user.isLoggedIn)
      return

    fetchWishlistIds()
  }
})
