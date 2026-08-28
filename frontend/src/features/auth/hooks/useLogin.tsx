import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '../../../api/types'
import { useAuthStore } from '../../../stores/authStore'
import { loginRequest } from '../api'
import type { AuthResponse, LoginPayload } from '../types'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  return useMutation<AuthResponse, AxiosError<ApiErrorResponse>, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: (data) => setSession(data.user, data.accessToken),
  })
}
