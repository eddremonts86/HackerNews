import { useFetch } from 'nuxt/app'
type useFetchType = typeof useFetch

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'

export const useFetchApi: useFetchType = (path: string, options: any = {}) => {

  options = {
    ...options,
    baseURL: BASE_URL,
    headers: options.headers ?? {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    onResponseError: (response: unknown) => {
      return response
    },
  }
  return useFetch(path, options)
}
