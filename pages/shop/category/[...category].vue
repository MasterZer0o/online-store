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
if (page && parseInt(page as string) <= 0) {
  await navigateTo({
    path: route.path,
    query: {
      page: 1
    }
  })
}

if (page && !isNaN(parseInt(page as string)) && +page >= 1) {
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

  store.currentCategory.slug = route.params.category![0]

  fetchProducts(false, true)
})

useHead({
  title: () => store.currentCategory.name!
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
