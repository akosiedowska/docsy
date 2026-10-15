import { Group, Stack, Text } from '@mantine/core'
import { LayoutDashboard, CircleUserRound, CalendarPlus } from 'lucide-react'

import classes from './BottomNav.module.css'
import { Link } from '@tanstack/react-router'
import { paths } from '../../app/paths'
import { useAuthStore } from '../../stores/authStore'

const BottomNav = () => {
  const { user } = useAuthStore()

  return (
    <Group h='70' p='10' gap='6' grow>
      <Link to={paths.DASHBOARD} className={classes.navLink}>
        <Stack gap='3' align='center'>
          <LayoutDashboard />
          <Text fw='700' size='11px'>
            Dashboard
          </Text>
        </Stack>
      </Link>
      {user?.role === 'PATIENT' ? (
        <Link to={paths.RESERVATION} className={classes.navLink}>
          <Stack gap='3' align='center'>
            <CalendarPlus />
            <Text fw='700' size='11px'>
              Book
            </Text>
          </Stack>
        </Link>
      ) : null}
      <Link to={paths.PROFILE} className={classes.navLink}>
        <Stack gap='3' align='center'>
          <CircleUserRound />
          <Text fw='700' size='11px'>
            Profile
          </Text>
        </Stack>
      </Link>
    </Group>
  )
}

export default BottomNav
