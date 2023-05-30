<script setup lang="ts">
const { data: categories } = await useFetch<CategoriesReturn>('/categories')
</script>

<template>
  <div class="mega-menu">
    <ul class="mega-menu__list">
      <li v-for="category in categories" :key="category.name">
        <strong class="title">{{ category.name }}</strong>

        <ul class="entries">
          <li v-for="entry in category.subCategories" :key="entry.name">
            <NuxtLink :to="entry.link">
              {{ entry.name }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
