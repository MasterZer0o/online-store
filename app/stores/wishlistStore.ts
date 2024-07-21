export const wishlistStore = defineStore('wishlist', () => {
  const items = ref(new Map<number, Product>())

  const ids = ref(new Set<number>())

  const currentlyViewedProductId = ref<number>(-1)

  const isCurrentProductIn = computed(() => ids.value.has(currentlyViewedProductId.value))

  const error = ref<null | string>(null)

  return {
    items,
    currentlyViewedProductId,
    isCurrentProductIn,
    ids,
    error
  }
})
