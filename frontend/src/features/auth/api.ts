import { apiClient } from '../../api/client'
import type { AuthUser, LoginPayload, AuthResponse, RegisterPayload, RegisterResponse } from './types'

export const loginRequest = (payload: LoginPayload) => {
  return apiClient.post<AuthResponse>('/auth/login', payload).then((r) => r.data)
}

export const registerRequest = (payload: RegisterPayload) => {
  return apiClient.post<RegisterResponse>('/users', payload).then((r) => r.data)
}

export const logoutRequest = () => {
  return apiClient.post<void>('/auth/logout')
}

export const meRequest = () => {
  return apiClient.get<AuthUser>('/auth/me').then((r) => r.data)
}
