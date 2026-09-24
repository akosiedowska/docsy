import { QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { queryClient } from '../api/queryClient'
import { useAuthBootstrap } from '../features/auth/hooks/useAuthBootstrap'
import { theme } from '../styles/theme'

export function AppProviders({ children }: { children: React.ReactNode }) {
  useAuthBootstrap()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
