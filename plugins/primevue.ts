import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Menu from 'primevue/menu'
import Ripple from 'primevue/ripple'
import Dropdown from 'primevue/dropdown'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('SplitButton', SplitButton)
  nuxtApp.vueApp.component('Menu', Menu)
  nuxtApp.vueApp.component('Dropdown', Dropdown)
  nuxtApp.vueApp.directive('Ripple', Ripple)
})
