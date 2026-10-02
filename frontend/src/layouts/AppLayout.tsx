import { Outlet } from '@tanstack/react-router'
import { AppShell, Container } from '@mantine/core'

import Header from '../components/layout/Header'
import { useAuthStore } from '../stores/authStore'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { palette } from '../styles/colors'

const AppLayout = () => {
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)

  return (
    <AppShell header={{ height: { base: 70, sm: 86 } }}>
      <Header />
      <AppShell.Main bg={palette.background}>
        <Container p='36px'>{isBootstrapping ? <LoadingSpinner /> : <Outlet />}</Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default AppLayout
