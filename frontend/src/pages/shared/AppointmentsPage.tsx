import { Stack, Text } from '@mantine/core'

import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import AppointmentsTable from '../../features/appointments/components/shared/AppointmentsTable'
import { useAppointments } from '../../features/appointments/hooks/useAppointments'
import { palette } from '../../styles/colors'

const AppointmentsPage = () => {
  const { data: appointments, isPending, isError } = useAppointments()

  if (isPending) return <LoadingSpinner />
  if (isError) return <Text c={palette.alert}>Failed to load appointments.</Text>

  return (
    <Stack flex={1} mih={0}>
      <AppointmentsTable items={appointments} />
    </Stack>
  )
}

export default AppointmentsPage
