import { AppBar, Box, Link, Stack, Toolbar } from '@mui/material';
import { HousePlus } from 'lucide-react';
import { Link as RouterLink } from 'react-router';

const Header = () => {
  return (
    <AppBar position="sticky" color="primary" sx={{ px: { xs: 2, sm: 4 } }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HousePlus />
        </Box>
        <Stack direction="row" spacing={2}>
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            Log in
          </Link>
          <Link component={RouterLink} to="/register" color="inherit" underline="hover">
            Sign up
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header