import { AppShell, Anchor, Avatar, Button, Menu, Text, Box, Flex, Group } from '@mantine/core'
import { HousePlus, CircleUserRound, LogOut, Plus, ClipboardList } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { useAuthStore } from '../../stores/authStore'
import { useLogout } from '../../features/auth/hooks/useLogout'
import { getInitials } from '../../utils/helpers'
import { paths } from '../../app/paths'
import { logoFontFamily } from '../../styles/theme'
import { palette } from '../../styles/colors'

import classes from './Header.module.css'

const Header = () => {
  const { isAuthenticated, user } = useAuthStore()
  const { mutate: logout } = useLogout()

  return (
    <AppShell.Header bg='white'>
      <Group h='100%' px={{ base: 'md', sm: 'xl' }} justify='space-between' wrap='nowrap'>
        <Anchor
          component={Link}
          to={isAuthenticated ? paths.DASHBOARD : paths.HOME}
          underline='never'
        >
          <Flex gap='6' align='center'>
            <HousePlus width={36} height={36} strokeWidth={2.5} color={palette.violet} />
            <Text size='1.5rem' c='violet' fw={700} ff={logoFontFamily}>
              Docsy
            </Text>
          </Flex>
        </Anchor>
        {isAuthenticated && (
          <Group visibleFrom='sm' gap='xl'>
            <Link to={paths.DASHBOARD} className={classes.navLink}>
              Dashboard
            </Link>
            <Link to={paths.PROFILE} className={classes.navLink}>
              Profile
            </Link>
          </Group>
        )}
        {isAuthenticated ? (
          <Group align='center' gap='xl'>
            <Anchor component={Link} to={paths.RESERVATION} visibleFrom='sm'>
              <Button leftSection={<Plus />}>Book</Button>
            </Anchor>
            <Menu shadow='md' width={220} position='bottom-end'>
              <Menu.Target>
                <Avatar
                  className={classes.avatar}
                  classNames={{ placeholder: classes.placeholder }}
                >
                  {getInitials(user?.firstName, user?.lastName)}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Box px='16' py='8'>
                  <Text size='sm' fw={700} truncate>
                    {user?.firstName}&nbsp;{user?.lastName}
                  </Text>
                  <Text size='xs' c='dimmed' truncate>
                    {user?.email}
                  </Text>
                </Box>
                <Menu.Divider />
                <Menu.Item
                  component={Link}
                  to={paths.DASHBOARD}
                  leftSection={<ClipboardList size={18} color={palette.ink} />}
                >
                  Dashboard
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  to={paths.PROFILE}
                  leftSection={<CircleUserRound size={18} color={palette.ink} />}
                >
                  Profile
                </Menu.Item>
                <Menu.Item color='red' leftSection={<LogOut size={18} />} onClick={() => logout()}>
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ) : (
          <Group gap='md'>
            <Anchor component={Link} to={paths.HOME} c='inherit' underline='hover'>
              Log in
            </Anchor>
            <Anchor component={Link} to={paths.REGISTER} c='inherit' underline='hover'>
              Sign up
            </Anchor>
          </Group>
        )}
      </Group>
    </AppShell.Header>
  )
}

export default Header
