import { Button, Group, Stack, Text, Anchor } from '@mantine/core'
import { Link } from '@tanstack/react-router'

import { useAuthStore } from '../../../../stores/authStore'
import { paths } from '../../../../app/paths'
import { getGreeting } from '../../../../utils/helpers'
import { palette } from '../../../../styles/colors'

const DashboardGreeting = () => {
  const { user } = useAuthStore()

  return (
    <Group justify='space-between' gap='xl' px='lg'>
      <Stack>
        <Text fw={700} size='30px'>
          {getGreeting()}, {user?.firstName}
        </Text>
        <Text size='15px' c={palette.grayText}>
          Here's what's next for your care.
        </Text>
      </Stack>
      <Anchor component={Link} to={paths.RESERVATION} ml='auto'>
        <Button>Book appointment</Button>
      </Anchor>
    </Group>
  )
}

export default DashboardGreeting
