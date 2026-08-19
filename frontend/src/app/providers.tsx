import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '../api/queryClient'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../styles/theme'
import { useAuthBootstrap } from '../features/auth/hooks/useAuthBootstrap'

export function AppProviders({ children }: { children: React.ReactNode }) {
  useAuthBootstrap()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
