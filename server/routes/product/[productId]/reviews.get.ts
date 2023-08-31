import { getReviews } from '~/server/lib/shop/getReviews'

export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParams(event).productId)

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews(productId)

  await new Promise(resolve => setTimeout(resolve, 1000))
  return reviews
})
