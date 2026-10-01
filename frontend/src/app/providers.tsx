import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '../api/queryClient'
import { theme } from '../styles/theme'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  )
}
