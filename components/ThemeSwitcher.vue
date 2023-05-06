<script setup lang="ts">
const theme = useTheme()
if (process.client) {
  try {
    const currentTheme = localStorage.getItem('theme') as Theme
    theme.value = currentTheme
    const el = document.querySelector('.theme-switcher') as HTMLElement
    el.dataset.theme = theme.value
  }
  catch (error) {

  }
}

function switchTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.body.setAttribute('class', `${theme.value} chg`)
  setTimeout(() => {
    document.body.classList.remove('chg')
  }, 100)
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <div class="theme-switcher" :data-theme="theme" @click="switchTheme">
    <IconsMoon />
    <IconsSun />
    <div class="handle" />
  </div>

  <Html :style="theme === 'dark' ? 'color-scheme:dark;' : undefined" />
</template>
