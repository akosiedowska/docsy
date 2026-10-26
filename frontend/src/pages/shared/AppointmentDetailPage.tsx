import { getRouteApi } from '@tanstack/react-router'
import { useAppointment } from '../../features/appointments/hooks/useAppointment'

const route = getRouteApi('/_auth/appointments/$appointmentId')

const AppointmentDetailPage = () => {
  const { appointmentId } = route.useParams()
  const appointment = useAppointment(appointmentId)

  return (
    <div>
      <div>AppointmentDetailPage</div>
      <div>{appointmentId}</div>
      <div></div>
    </div>
  )
}

export default AppointmentDetailPage
