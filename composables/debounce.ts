import deb from 'just-debounce-it'

export function debounce(callback: Function, wait = 800) {
  return deb(callback, wait)
}
