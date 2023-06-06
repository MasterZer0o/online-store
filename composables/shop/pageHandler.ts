export async function nextPage() {
  const store = useProducts()
  if (store.currentPage === store.currentCategory.totalPages || store.isLoadingProducts)
    return

  store.currentPage++

  goToPage(store.currentPage)
}

export async function previousPage() {
  const store = useProducts()

  if (store.currentPage === 1 || store.isLoadingProducts)
    return

  store.currentPage--
  store.resetCursor()

  goToPage(store.currentPage)
}

export const pageFromInput = debounce((event: InputEvent, shouldScrollTop?: boolean) => {
  const inputElement = event.target as HTMLInputElement
  const pageValue = inputElement.valueAsNumber
  const isBadPageNumber = Number.isNaN(pageValue)

  if (isBadPageNumber) {
    inputElement.blur()
    return
  }

  const store = useProducts()

  if (pageValue > store.currentCategory.totalPages || pageValue <= 0 || pageValue === store.currentPage)
    return

  store.currentPage = pageValue
  store.resetCursor()

  inputElement.blur()

  if (shouldScrollTop)
    window.scrollTo(0, 0)

  goToPage(store.currentPage)
}, 1000)

export async function goToPage(page: number, meta = false) {
  await fetchProducts(meta)

  return navigateTo({
    query: {
      page
    }
  })
}
