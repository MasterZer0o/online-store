export async function nextPage() {
  const store = useProducts()
  if (store.currentPage === store.currentCategory.totalPages)
    return

  store.currentPage++

  goToPage(store.currentPage)
}

export async function previousPage() {
  const store = useProducts()

  if (store.currentPage === 1 || store.isLoadingProducts)
    return

  store.currentPage--
  store.cid = undefined // reset cursor

  goToPage(store.currentPage)
}

export const pageFromInput = debounce((event: InputEvent, shouldScrollTop?: boolean) => {
  const store = useProducts()

  const inputElement = event.target as HTMLInputElement
  const pageValue = inputElement.valueAsNumber
  const isValidPageNumber = isNaN(pageValue)

  if (isValidPageNumber) {
    inputElement.blur()
    return
  }

  if (pageValue > store.currentCategory.totalPages || pageValue <= 0 || pageValue === store.currentPage)
    return

  store.currentPage = pageValue
  store.cid = undefined

  inputElement.blur()

  if (shouldScrollTop)
    window.scrollTo(0, 0)

  goToPage(store.currentPage)
}, 1000)

export async function goToPage(page: number, meta = false) {
  await fetchProducts(true, meta)

  return navigateTo({
    query: {
      page
    }
  })
}
