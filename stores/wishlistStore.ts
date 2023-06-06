export const wishlistStore = defineStore('wishlist', () => {
  const items = ref(new Map<number, Product>())

  const ids = ref(new Set<number>())

  const error = ref<null | string>(null)

  return {
    items,
    ids,
    error
  }
})
