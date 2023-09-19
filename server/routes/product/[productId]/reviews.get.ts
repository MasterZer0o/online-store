import { getReviews } from '~/server/lib/shop/getReviews'

interface IncomingQueryParams {
  p: string // page
  cid: string
  r?: string // rating
}

export default defineEventHandler(async (event): Promise<ReviewData> => {
  const productId = Number(getRouterParams(event).productId)
  const { p: requestedPage, cid, r: rating }: IncomingQueryParams = getQuery<IncomingQueryParams>(event)

  const MAX_REVIEWS_PER_PAGE = 20
  let page = Number.parseInt(requestedPage)
  page = Number.isNaN(page) ? 1 : page

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews({ productId, page, perPage: MAX_REVIEWS_PER_PAGE, cid, rating })

  const response: ReviewData | ReviewData<true> = {
    cid: reviews.at(-1)!.id,
    counts: reviews.at(-1)?.counts,
    perPage: page === 1 ? MAX_REVIEWS_PER_PAGE : undefined,
    // averageRating: page === 1 ? calculateAverage(reviews[0].counts!) : undefined,
    data: reviews.reduce<ReviewData['data']>((acc, val) => {
      delete val.counts

      acc.push(val)
      return acc
    }, [])
  }

  // await wait(500)

  return response
})
interface ReviewDataBase {
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
  perPage?: number
}

type InitialReviewsRequest = ReviewDataBase & {
  counts: NonNullable<Awaited<ReturnType<typeof getReviews>>[number]['counts']>
  // averageRating: string
}

declare global {
  type ReviewData<IsInitialRequest = false> = IsInitialRequest extends true ? InitialReviewsRequest : ReviewDataBase
}

// function calculateAverage(counts: RatingCounts) {
//   let totalResponses = 0
//   let totalScore = 0
//   let k: keyof RatingCounts

//   for (k in counts) {
//     const value = counts[k]
//     totalResponses += value
//     totalScore += counts[k] * parseInt(k[1])
//   }

//   return (totalScore / totalResponses).toFixed(1)
// }
