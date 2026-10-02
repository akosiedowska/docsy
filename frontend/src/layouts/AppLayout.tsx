import { Outlet } from '@tanstack/react-router'
import { AppShell, Container } from '@mantine/core'

import Header from '../components/layout/Header'
import { useAuthStore } from '../stores/authStore'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { palette } from '../styles/colors'

import classes from './AppLayout.module.css'
import BottomNav from '../components/layout/BottomNav'

const AppLayout = () => {
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)

  return (
    <AppShell header={{ height: { base: 70, sm: 86 } }} footer={{ height: { base: 70, sm: 0 } }}>
      <Header />
      <AppShell.Main bg={palette.background}>
        <Container className={classes.container}>
          {isBootstrapping ? <LoadingSpinner /> : <Outlet />}
        </Container>
      </AppShell.Main>
      <AppShell.Footer hiddenFrom='sm'>
        <BottomNav />
      </AppShell.Footer>
    </AppShell>
  )
}

export default AppLayout
