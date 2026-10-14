import { Outlet } from '@tanstack/react-router'
import { Box, Group } from '@mantine/core'

import { useAuthStore } from '../stores/authStore'
// import Sidebar from '../components/layout/Sidebar'
// import { staffNav } from '../app/navLinks'

const DashboardShell = () => {
  const role = useAuthStore((s) => s.user?.role)

  if (!role || role === 'PATIENT') return <Outlet />

  return (
    <Group align='flex-start' wrap='nowrap' gap='lg'>
      {/* <Sidebar links={staffNav[role]} visibleFrom='sm' /> */}
      <Box flex={1} miw={0}>
        <Outlet />
      </Box>
    </Group>
  )
}

export default DashboardShell
