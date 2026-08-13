import axios, {AxiosError} from "axios";


export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  withCredentials: true, 
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // session expired/invalid — clear local state and bounce to login
      // e.g. useAuthStore.getState().clearSession()
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
)