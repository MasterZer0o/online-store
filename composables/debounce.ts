import deb from 'just-debounce-it'

export function debounce(callback: () => any, wait = 800) {
  return deb(callback, wait)
}
