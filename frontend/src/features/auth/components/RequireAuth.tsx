import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../../../stores/authStore'

export function RequireAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  // return isAuthenticated ? (
  //   <Outlet />
  // ) : (
  //   <Navigate
  //     to='/'
  //     replace
  //     state={{ message: "You must log in first.", from: location }}
  //   />
  // )
  if (isAuthenticated) return <Outlet />

  sessionStorage.setItem('authMessage', 'You must log in first.')
  return <Navigate to='/' replace state={{ from: location }} />
}
