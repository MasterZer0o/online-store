import type { Ref } from 'nuxt/dist/app/compat/capi'

export const useTheme = (): Ref<Theme> => useState('theme', () => 'dark')
