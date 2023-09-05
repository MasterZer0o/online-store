import { getReviews } from '~/server/lib/shop/getReviews'

export default defineEventHandler(async (event) => {
  const productId = Number(getRouterParams(event).productId)
  let { page }: { page: string | number } = getQuery<{ page: string }>(event)

  page = Number.parseInt(page)
  page = Number.isNaN(page) ? 1 : page

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews(productId) as ReviewData[]

  // await new Promise(resolve => setTimeout(resolve, 1000))
  return reviews
})

declare global {
  interface ReviewData {
    username: string
    comment: string
    rating: number
    postedAt: Date
  }
}
