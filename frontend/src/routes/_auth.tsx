import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { useAuthStore } from '../stores/authStore'
import { authBootstrapPromise } from '../features/auth/bootstrap'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export const Route = createFileRoute('/_auth')({
  pendingMs: 0,
  pendingComponent: LoadingSpinner,
  beforeLoad: async ({ location }) => {
    await authBootstrapPromise

    if (useAuthStore.getState().isAuthenticated) return

    throw redirect({
      to: '/',
      replace: true,
      search: { redirect: location.href },
      state: { message: 'You must log in first.' },
    })
  },
  component: () => <Outlet />,
})
