import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '../../stores/authStore'
import type { UserRole } from './types'

export const requireRole =
  (...allowed: UserRole[]) =>
  () => {
    const user = useAuthStore.getState().user
    if (!user || !allowed.includes(user.role)) {
      throw redirect({ to: '/dashboard', replace: true })
    }
  }
