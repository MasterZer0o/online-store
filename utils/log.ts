import { consola } from 'consola'

const instance = consola.create({
  formatOptions: {
    colors: true,
    columns: 4,
    compact: false,
    date: false
  }
})

export const info = instance.info
export const warn = instance.warn
export const error = instance.error
export const success = instance.success
