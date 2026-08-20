import { Box, CircularProgress } from '@mui/material'
import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '../../../stores/authStore'

export function RequireAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)
  const location = useLocation()

  if (isBootstrapping) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isAuthenticated) return <Outlet />

  sessionStorage.setItem('authMessage', 'You must log in first.')
  return <Navigate to='/' replace state={{ from: location }} />
}
