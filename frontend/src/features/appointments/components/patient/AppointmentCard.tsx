import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import type { Appointment } from '../../types'
import { useCancelAppointment } from '../../hooks/useCancelAppoinment'

type AppointmentCardProps = {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { mutate: cancelAppointment } = useCancelAppointment()

  return (
    <Card sx={{ width: 400 }}>
      <CardContent>
        <Stack
          direction='row'
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack>
            <Typography>{appointment.slot.doctor.specialization}</Typography>
            <Typography>
              {appointment.slot.doctor.user.firstName} {appointment.slot.doctor.user.lastName}
            </Typography>
            <Typography>{appointment.slot.address}</Typography>
          </Stack>
          <Stack>
            <Typography>{new Date(appointment.slot.date).toLocaleTimeString()}</Typography>
            <Typography>{new Date(appointment.slot.date).toLocaleDateString()}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      {appointment.conducted !== true && (
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button onClick={() => cancelAppointment(appointment.id)}>Cancel</Button>
          <Button>Reschedule</Button>
        </CardActions>
      )}
    </Card>
  )
}
