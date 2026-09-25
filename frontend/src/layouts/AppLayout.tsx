import { Outlet } from '@tanstack/react-router'
import { Container } from '@mui/material'
import Header from '../components/layout/Header'
import { useAuthStore } from '../stores/authStore'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

const AppLayout = () => {
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)

  return (
    <>
      <Header />
      <Container sx={{ p: 4 }}>{isBootstrapping ? <LoadingSpinner /> : <Outlet />}</Container>
    </>
  )
}

export default AppLayout
