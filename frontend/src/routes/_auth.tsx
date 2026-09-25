import { Outlet, createFileRoute, redirect, type HistoryState } from '@tanstack/react-router'
import { useAuthStore } from '../stores/authStore'
import { authBootstrapPromise } from '../features/auth/bootstrap'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export const Route = createFileRoute('/_auth')({
  pendingMs: 0,
  pendingComponent: LoadingSpinner,
  beforeLoad: async ({ location }) => {
    await authBootstrapPromise

    if (useAuthStore.getState().isAuthenticated) return

    sessionStorage.setItem('authMessage', 'You must log in first.')
    throw redirect({ to: '/', replace: true, state: { from: location } as HistoryState })
  },
  component: () => <Outlet />,
})
