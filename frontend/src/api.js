const rawBaseUrl = import.meta.env.VITE_API_URL || '/api'

export const getApiUrl = (path = '') => {
  const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${normalizedPath}`
}
