<script setup lang="ts">
definePageMeta({
  layout: 'listing',
  validate: (route: any) => {
    // early basic validation
    return Array.isArray(route.params.category) && /^[a-z](-?[a-z])+$/g.test(route.params.category[0])
  }
})

const store = useProducts()

const route = useRoute('shop-category-category')

const page = route.query.page

// if user manually went to page <=0, redirect to page 1.
if (page && Number.parseInt(page as string) <= 0) {
  await navigateTo({
    path: route.path,
    query: {
      page: 1
    }
  })
}

if (page && !Number.isNaN(Number.parseInt(page as string)) && +page >= 1) {
  store.currentPage = +page
}

if (process.server) {
  try {
    await fetchMeta(route.params.category![0])
  }
  catch (error) {
    throw createError({ statusCode: 404, message: 'Page not found' })
  }
}

onBeforeMount(() => {
  const route = useRoute('shop-category-category')
  const currentSlug = route.params.category![0]

  store.currentPage = route.query.page ? Number.parseInt(route.query.page as string) : 1

  if (store.currentCategory.slug !== currentSlug)
    store.resetCursor()

  if (store.currentCategory.slug !== currentSlug || store.products.length === 0) {
    store.currentCategory.slug = currentSlug
    fetchProducts(true)
  }
  else
    store.currentCategory.slug = currentSlug
})

useHead({
  title: () => store.currentCategory.name
})
</script>

<template>
  <ShopSidebar />
  <div class=":uno: w-full">
    <ShopTopBar />
    <ShopProductsGrid />
    <ShopBottomBar />
  </div>
  <AppScrollUp />
</template>
