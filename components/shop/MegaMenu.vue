<script setup lang="ts">
// TODO: error handling
const { data: categories } = await useFetch('/categories')

useProducts().categories = categories.value!

const selected = ref(useRoute().path)

function changeCategory(event: MouseEvent, category: CategoriesReturn[number]) {
  event.preventDefault()

  const route = useRoute()
  const isTheSamePath = route.path === category.link
  if (isTheSamePath)
    return

  selected.value = category.link // to be removed (+ template)
  const store = useProducts()

  store.currentCategory.name = category.name
  store.currentCategory.slug = category.slug
  store.toInitialState()

  return navigateTo(category.link)
}
</script>

<template>
  <div>
    <ul>
      <li v-for="category in useProducts().categories" :key="Math.random()" :class="selected === category.link ? 'selected' : null">
        <a :href="category.link" @click="changeCategory($event, category)">
          {{ category.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
nav ul li:hover ul {
  display: flex;
}

.selected {
  background-color: var(--bg2);
}
ul {
  z-index: 1;
  padding: 2px 5px;
  background-color:var(--bg4);
  position: absolute;
  margin: 0;
  display: none;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;

  li{
    padding: 0 !important;
  }
a{
  height: 100%;
}

}
</style>
