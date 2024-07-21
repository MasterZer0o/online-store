// shop
export { fetchProducts } from './shop/fetchProducts'
export { fetchMeta } from './shop/fetchMeta'
export { nextPage, previousPage, pageFromInput, goToPage } from './shop/pageHandler'

// user
export { requestLogin } from './user/login'
export { requestRegister } from './user/register'
export { requestLogout } from './user/logout'

export * from './shop/useWishlist'

export const useTheme = (): Ref<Theme> => useState('theme', () => 'dark')
