export {}
declare global {
  export type Theme = 'dark' | 'light'

  export interface SimpleError {
    error: {
      message: string
    }
  }

  export type PossibleRating = 0 | 1 | 2 | 3 | 4 | 5

  export type RatingCounts = Record<'r1' | 'r2' | 'r3' | 'r4' | 'r5', number>

}
