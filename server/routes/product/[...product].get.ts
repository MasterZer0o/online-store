import { getProduct } from '../../lib/shop/getProduct'

export default defineEventHandler(async (event) => {
  const { product: productId } = getRouterParams(event)

  const product = await getProduct(productId)

  if ('error' in product) {
    setResponseStatus(event, product.error.statusCode)
  }

  return product
})
