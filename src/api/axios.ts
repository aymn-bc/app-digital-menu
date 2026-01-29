import axios, { AxiosError } from 'axios'
import { API_BASE } from '@/app/config'

let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // for refresh token cookie
})

// Attach token in memory
api.interceptors.request.use((cfg) => {
  if (accessToken) {
    const h = (cfg.headers as any) || {}
    h['Authorization'] = `Bearer ${accessToken}`
    cfg.headers = h
  }
  return cfg
})

// Response interceptor to handle 401 via refresh endpoint
let isRefreshing = false
let refreshQueue: Array<(token: string | null) => void> = []

async function refreshToken() {
  try {
    const res = await axios.post(`${API_BASE}/auth/refresh`, null, { withCredentials: true })
    const token = res.data?.accessToken
    setAccessToken(token)
    return token
  } catch (err) {
    setAccessToken(null)
    return null
  }
}

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError | any) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            if (token) original.headers['Authorization'] = `Bearer ${token}`
            resolve(api(original))
          })
        })
      }
      original._retry = true
      isRefreshing = true
      const token = await refreshToken()
      isRefreshing = false
      refreshQueue.forEach((cb) => cb(token))
      refreshQueue = []
      if (token) {
        original.headers['Authorization'] = `Bearer ${token}`
        return api(original)
      }
      // logout handled by caller
    }
    return Promise.reject(error)
  },
)

export default api
