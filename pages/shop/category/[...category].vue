<script setup lang="ts">
definePageMeta({
  layout: 'shop',
  validate: (route) => {
    // early basic validation
    return Array.isArray(route.params.category) && /^[a-z]+-?[a-z]+$/g.test(route.params.category[0])
  }
})

const store = useProducts()

const route = useRoute()

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
    await fetchMeta(route.params.category[0])
  }
  catch (error) {
    throw createError({ statusCode: 404, message: 'Page not found' })
  }
}
// if (process.server) {
//   try {
//     const category = await useFetch<{ error: string } | { category: { categoryName: string } }>
//     ('/category', { params: { name: route.params.category[0] } })

//     if ('error' in category.data.value!)
//       throw createError({ statusCode: 404, message: category.data.value.error })

//     store.currentCategory.name = category.data.value!.category.categoryName
//     store.currentCategory.slug = category.data.value!.category.categoryName.toLowerCase()
//   }
//   catch (error) {
//     throw createError({ statusCode: 404, message: 'Something went wrong' })
//   }
// }

onBeforeMount(() => fetchProducts(false, true))

useHead({
  title: () => store.currentCategory.name!
})
</script>

<template>
  <ShopSidebar />
  <div>
    <ShopTopBar />
    <ShopProductsGrid />
    <ShopBottomBar />
  </div>
  <AppScrollUp />
</template>
