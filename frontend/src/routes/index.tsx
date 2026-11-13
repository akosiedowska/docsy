import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginPage from '../pages/auth/Loginpage'
import { loginSearchSchema } from '../features/auth/schemas'
import { authBootstrapPromise } from '../features/auth/bootstrap'
import { useAuthStore } from '../stores/authStore'

export const Route = createFileRoute('/')({
  validateSearch: loginSearchSchema,
  beforeLoad: async ({ search }) => {
    await authBootstrapPromise

    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ href: search.redirect ?? '/dashboard', replace: true })
    }
  },
  component: LoginPage,
})
