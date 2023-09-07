import { getReviews } from '~/server/lib/shop/getReviews'

export default defineEventHandler(async (event): Promise<ReviewData> => {
  const productId = Number(getRouterParams(event).productId)
  let { page }: { page: string | number } = getQuery<{ page: string }>(event)

  page = Number.parseInt(page)
  page = Number.isNaN(page) ? 1 : page

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews(productId, page) as (ReviewData['data'][number] & { id?: number })[]
  // await new Promise(resolve => setTimeout(resolve, 1500))

  return {
    cid: reviews.at(-1)!.id!,
    data: reviews.reduce<ReviewData['data']>((acc, val) => {
      // delete val.reviewId
      acc.push(val)
      return acc
    }, []),
  }
})

declare global {
  interface ReviewData {
    data: {
      username: string
      comment: string
      rating: number
      postedAt: Date
      /**
       * Review id.
       */
      id: number
    }[]
    /**
     * Last review `id` of the current page for pagination.
     */
    cid: number
  }
}
