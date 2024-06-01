import { useFetch } from 'nuxt/app'
type useFetchType = typeof useFetch

export const useFetchApi: useFetchType = (path: string, options: any = {}) => {
  const appConfig = useAppConfig()
  options = {
    ...options,
    baseURL: appConfig.base_url ?? process.env.BASE_URL,
    headers: options.headers ?? {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    onResponseError: (response: unknown) => {
      console.error(response)
    },
  }
  return useFetch(path, options)
}
