(() => {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme !== null) {
    document.body.setAttribute('class', localStorage.getItem('theme'))
    return
  }
    let theme = ''
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark': 'light'
    localStorage.setItem('theme', theme)
    document.body.setAttribute('class', theme)
  
})();
