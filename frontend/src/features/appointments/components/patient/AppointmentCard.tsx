import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import type { Appointment } from '../../types'

type AppointmentCardProps = {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
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
      <CardActions sx={{ justifyContent: 'end' }}>
        <Button>Cancel</Button>
        <Button>Reschedule</Button>
      </CardActions>
    </Card>
  )
}
