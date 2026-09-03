import { CircularProgress, Stack, Typography } from '@mui/material'

import { AppointmentCard } from './AppointmentCard'
import { useAppointments } from '../../hooks/useAppointments'
import type { Appointment } from '../../types'

const AppointmentList = () => {
  const { isPending, isError, data: appointments, error } = useAppointments()

  if (isPending) {
    return <CircularProgress sx={{ mt: 2 }} />
  }

  if (isError) {
    return <Typography color='error'>{error.message}</Typography>
  }

  const nextAppointments = appointments.filter(
    (a) => a.conducted === false && a.cancelled === false,
  )
  const previousAppointments = appointments.filter((a) => a.conducted === true)

  return (
    <Stack spacing={5} sx={{ alignItems: 'center' }}>
      <Stack spacing={2} sx={{ width: '400px' }}>
        <Typography>Next appointments</Typography>
        {nextAppointments.length > 0 ? (
          nextAppointments.map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment.id} />
          ))
        ) : (
          <Typography>No appointments yet.</Typography>
        )}
      </Stack>
      <Stack spacing={2} sx={{ width: '400px' }}>
        <Typography>Previous appointments</Typography>
        {previousAppointments.length > 0 ? (
          previousAppointments.map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment.id} />
          ))
        ) : (
          <Typography>No appointments yet.</Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default AppointmentList
