import { AppBar, Box, Link, Stack, Toolbar, Typography } from '@mui/material';
import { HousePlus } from 'lucide-react';
import { Link as RouterLink } from 'react-router';

import { logoFontFamily } from '../../styles/theme';

const Header = () => {
  return (
    <AppBar position="sticky" color="primary" sx={{ px: { xs: 2, sm: 4 } }}>
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HousePlus />
          <Typography sx={{ fontFamily: logoFontFamily, fontSize: '1.5rem' }}>
            Docsy
          </Typography>
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