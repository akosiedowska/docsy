import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type AuthUser } from '../features/auth/types'
import { useAppointmentsFilterStore } from './appointmentsFilterStore'

type AuthState = {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  isBootstrapping: boolean
  setSession: (user: AuthUser, accessToken: string) => void
  setAccessToken: (accessToken: string) => void
  clearSession: () => void
  setBootstrapped: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isBootstrapping: true,
      setSession: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearSession: () => {
        set({ user: null, accessToken: null, isAuthenticated: false })
        useAppointmentsFilterStore.getState().reset()
        useAppointmentsFilterStore.getState().setRestoreOnReturn(false)
      },
      setBootstrapped: () => set({ isBootstrapping: false }),
    }),
    {
      name: 'docsy_auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
)
