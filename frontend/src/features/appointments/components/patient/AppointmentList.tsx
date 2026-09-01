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

  return (
    <Stack spacing={5} sx={{ alignItems: 'center' }}>
      <Stack spacing={2}>
        <Typography>Next appointments</Typography>
        {appointments
          .filter((a) => a.conducted === false)
          .map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment.id} />
          ))}
      </Stack>
      <Stack spacing={2}>
        <Typography>Previous appointments</Typography>
        {appointments
          .filter((a) => a.conducted === true)
          .map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment.id} />
          ))}
      </Stack>
    </Stack>
  )
}

export default AppointmentList
