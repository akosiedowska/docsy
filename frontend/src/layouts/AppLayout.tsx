import { Outlet } from '@tanstack/react-router'
import { AppShell, Container } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Header from '../components/layout/Header'
import { useAuthStore } from '../stores/authStore'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { palette } from '../styles/colors'
import BottomNav from '../components/layout/BottomNav'
import Sidebar from '../components/layout/Sidebar'
import { staffNav } from '../app/sidebarLinks'

import classes from './AppLayout.module.css'

const AppLayout = () => {
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping)
  const { isAuthenticated } = useAuthStore()
  const role = useAuthStore((s) => s.user?.role)
  const [collapsed, { toggle }] = useDisclosure(false)

  const hasSidebar = isAuthenticated && !!role && role !== 'PATIENT'

  return (
    <AppShell
      header={{ height: { base: 70, sm: 86 } }}
      footer={{ height: isAuthenticated ? { base: 70, sm: 0 } : 0 }}
      navbar={
        hasSidebar
          ? {
              width: collapsed ? 68 : 240,
              breakpoint: 'sm',
              collapsed: { mobile: true },
            }
          : undefined
      }
    >
      <Header />
      {hasSidebar && (
        <AppShell.Navbar p='xs' className={classes.navbar}>
          <Sidebar links={staffNav[role]} collapsed={collapsed} onToggle={toggle} />
        </AppShell.Navbar>
      )}
      <AppShell.Main bg={palette.background} className={classes.main}>
        <Container className={classes.container}>
          {isBootstrapping ? <LoadingSpinner /> : <Outlet />}
        </Container>
      </AppShell.Main>
      {isAuthenticated ? (
        <AppShell.Footer hiddenFrom='sm'>
          <BottomNav />
        </AppShell.Footer>
      ) : null}
    </AppShell>
  )
}

export default AppLayout
