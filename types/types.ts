export {}
declare global {
  export type Theme = 'dark' | 'light'

  export interface SimpleError {
    error: {
      message: string
    }
  }

}
