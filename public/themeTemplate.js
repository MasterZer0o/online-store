(() => {
  const currentTheme = localStorage.getItem('theme')
  if (['dark', 'light'].includes(currentTheme)) {
    document.body.setAttribute('class', currentTheme)
    return
  }

  let theme = window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.body.setAttribute('class', theme)
})()
