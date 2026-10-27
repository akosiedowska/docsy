import { getRouteApi } from '@tanstack/react-router'
import { Text } from '@mantine/core'

import { useAppointment } from '../../features/appointments/hooks/useAppointment'
import AppointmentDetails from '../../features/appointments/components/shared/AppointmentDetails'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { getApiErrorMessage } from '../../api/getApiErrorMesage'
import { palette } from '../../styles/colors'

const route = getRouteApi('/_auth/appointments/$appointmentId')

const AppointmentDetailPage = () => {
  const { appointmentId } = route.useParams()
  const { data: appointment, isLoading, isError, error } = useAppointment(appointmentId)

  if (isLoading) return <LoadingSpinner />
  if (isError || !appointment) return <Text c={palette.alert}>{getApiErrorMessage(error)}</Text>

  return (
    <div>
      <div>AppointmentDetailPage</div>
      <div>{appointmentId}</div>
      <AppointmentDetails appointment={appointment} />
    </div>
  )
}

export default AppointmentDetailPage
