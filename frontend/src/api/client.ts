import axios, {AxiosError, type InternalAxiosRequestConfig} from "axios";

import { useAuthStore } from "../stores/authStore";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`)
  }
  return config
})

let refreshPromise: Promise<string> | null = null

export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = apiClient
      .post<{ accessToken: string }>("/auth/refresh")
      .then((r) => {
        useAuthStore.getState().setAccessToken(r.data.accessToken)
        return r.data.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    const url = originalRequest?.url ?? ""

    if (url.includes("/auth/refresh") || url.includes("/auth/login")) {
      return Promise.reject(error)
    }

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const newAccessToken = await refreshAccessToken()
      originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`)
      return apiClient(originalRequest)
    } catch (refreshError) {
      useAuthStore.getState().clearSession()
      window.location.href = '/'
      return Promise.reject(refreshError)
    }
  },
)
