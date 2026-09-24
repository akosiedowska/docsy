import { useEffect } from 'react'
import axios from 'axios'

import { useAuthStore } from '../../../stores/authStore'
import { refreshAccessToken } from '../../../api/client'
import { meRequest } from '../api'

function isUnauthorized(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 401
}

export function useAuthBootstrap() {
  useEffect(() => {
    if (!useAuthStore.getState().isAuthenticated) {
      useAuthStore.getState().setBootstrapped()
      return
    }

    ;(async () => {
      try {
        const accessToken = await refreshAccessToken()
        const user = await meRequest()
        useAuthStore.getState().setSession(user, accessToken)
      } catch (error) {
        useAuthStore.getState().clearSession()
        if (!isUnauthorized(error)) {
          console.error('Auth bootstrap failed', error)
        }
      } finally {
        useAuthStore.getState().setBootstrapped()
      }
    })()
  }, [])
}
