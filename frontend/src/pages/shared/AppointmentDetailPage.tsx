import { getRouteApi, useLocation } from '@tanstack/react-router'
import { Stack, Text } from '@mantine/core'
import { MoveLeft } from 'lucide-react'

import { useAppointment } from '../../features/appointments/hooks/useAppointment'
import AppointmentDetails from '../../features/appointments/components/shared/AppointmentDetails'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { getApiErrorMessage } from '../../api/getApiErrorMesage'
import { palette } from '../../styles/colors'
import ButtonLink from '../../components/ui/ButtonLink'
import { paths } from '../../app/paths'

const route = getRouteApi('/_auth/appointments/$appointmentId')

const AppointmentDetailPage = () => {
  const { appointmentId } = route.useParams()
  const location = useLocation()
  const { data: appointment, isLoading, isError, error } = useAppointment(appointmentId)

  if (isLoading) return <LoadingSpinner />
  if (isError || !appointment) return <Text c={palette.alert}>{getApiErrorMessage(error)}</Text>

  return (
    <Stack gap='md'>
      {location.state.fromTable && (
        <ButtonLink
          to={paths.APPOINTMENTS}
          leftSection={<MoveLeft />}
          fw={500}
          size='compact-md'
          variant='subtle'
          color='gray'
          w='fit-content'
        >
          Back to table
        </ButtonLink>
      )}
      <AppointmentDetails appointment={appointment} />
    </Stack>
  )
}

export default AppointmentDetailPage
