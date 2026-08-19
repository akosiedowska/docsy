import axios, {AxiosError} from "axios";

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

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const hadToken = Boolean(error.config?.headers?.get?.("Authorization"))
    if (error.response?.status === 401 && hadToken) {
      // an authenticated request came back unauthorized — session expired, bounce to login
      useAuthStore.getState().clearSession()
      window.location.href = '/'
    }
    return Promise.reject(error);
  },
)