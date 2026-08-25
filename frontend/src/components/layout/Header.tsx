import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { HousePlus, CircleUserRound, LogOut } from 'lucide-react'
import { Link as RouterLink } from 'react-router'

import { logoFontFamily } from '../../styles/theme'
import { brand } from '../../styles/colors'
import { useAuthStore } from '../../stores/authStore'
import { getInitials } from '../../utils/helpers'
import { useLogout } from '../../features/auth/hooks/useLogout'
import { UserAvatar } from '../ui/UserAvatar'

const Header = () => {
  const { isAuthenticated, user } = useAuthStore()
  const { mutate: logout } = useLogout()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position='sticky' sx={{ px: { xs: 2, sm: 4 } }} elevation={0}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <HousePlus width={36} height={36} strokeWidth={2.5} color='var(--mui-palette-primary-main)' />
          <Typography sx={{ fontFamily: logoFontFamily, fontSize: '1.5rem' }} color='primary'>
            Docsy
          </Typography>
        </Box>
        {isAuthenticated ? (
          <>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='secondary'
              sx={{ '&:hover': { backgroundColor: alpha(brand.lime, 0.6) } }}
            >
              <UserAvatar
                sx={{
                  bgcolor: 'background.paper',
                  color: 'primary.main',
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                {getInitials(user?.firstName, user?.lastName)}
              </UserAvatar>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right',
              // }}
              // keepMounted
              // transformOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right',
              // }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              elevation={1}
            >
              <MenuItem disableRipple sx={{ gap: 2, cursor: 'default', '&:hover': { backgroundColor: 'transparent' } }}>
                <UserAvatar sx={{ width: 24, height: 24, fontSize: '12px' }}>
                  {getInitials(user?.firstName, user?.lastName)}
                </UserAvatar>
                <Stack sx={{ minWidth: 0 }} spacing={0}>
                  <Typography variant='subtitle1' noWrap sx={{ fontWeight: 700, lineHeight: 1.25 }}>
                    {user?.firstName}&nbsp;{user?.lastName}
                  </Typography>
                  <Typography variant='caption' noWrap sx={{ display: 'block' }}>
                    {user?.email}
                  </Typography>
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{ gap: 2, '&:hover': { backgroundColor: alpha(brand.lime, 0.6) } }}
                onClick={() => {
                  console.log('hi')
                }}
              >
                <CircleUserRound color='var(--mui-palette-text-primary)' />
                Profile
              </MenuItem>
              <MenuItem
                sx={{ gap: 2, '&:hover': { backgroundColor: alpha(brand.lime, 0.6) } }}
                onClick={() => logout()}
              >
                <LogOut color='var(--mui-palette-text-primary)' />
                Log out
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Stack direction='row' spacing={2}>
            <Link component={RouterLink} to='/' color='inherit' underline='hover'>
              Log in
            </Link>
            <Link component={RouterLink} to='/register' color='inherit' underline='hover'>
              Sign up
            </Link>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
