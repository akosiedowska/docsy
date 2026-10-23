import { Button, Group, Stack, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { useAuthStore } from '../../../stores/authStore'
import { paths, type AppPath } from '../../../app/paths'
import { getDisplayName, getGreeting } from '../../../utils/helpers'
import { palette } from '../../../styles/colors'
import type { UserRole } from '../../auth/types'

type GreetingContent = {
  subtitle: string
  cta?: { label: string; to: AppPath }
}

const greetingByRole: Record<UserRole, GreetingContent> = {
  PATIENT: {
    subtitle: "Here's what's next for your care.",
    cta: { label: 'Book appointment', to: paths.RESERVATION },
  },
  DOCTOR: { subtitle: "Here's a look at your upcoming appointments." },
  ADMIN: { subtitle: "Here's how things look across Docsy." },
}

const DashboardGreeting = () => {
  const { user } = useAuthStore()

  if (!user) return null

  const { subtitle, cta } = greetingByRole[user.role]

  return (
    <Group justify='space-between' gap='xl' px='lg'>
      <Stack>
        <Text fw={700} size='30px'>
          {getGreeting()}, {getDisplayName(user)}
        </Text>
        <Text size='15px' c={palette.grayText}>
          {subtitle}
        </Text>
      </Stack>
      {cta && (
        <Button component={Link} to={cta.to}>
          {cta.label}
        </Button>
      )}
    </Group>
  )
}

export default DashboardGreeting
