import { useState } from 'react'
import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { CircleAlert } from 'lucide-react'

import type { Appointment } from '../../types'
import { useCancelAppointment } from '../../hooks/useCancelAppoinment'
import AlertDialog from '../../../../components/ui/AlertDialog'

type AppointmentCardProps = {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { mutate: cancelAppointment } = useCancelAppointment()
  const [openAlertDialog, setOpenDialog] = useState(false)

  const handleCloseAlertDialog = () => setOpenDialog(false)

  return (
    <>
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
            <Button onClick={() => setOpenDialog(true)}>Cancel</Button>
            {/* to be implemented */}
            {/* <Button>Reschedule</Button> */}
          </CardActions>
        )}
      </Card>
      <AlertDialog
        content='Are you sure you want to cancel the visit?'
        open={openAlertDialog}
        handleClose={handleCloseAlertDialog}
        confirmBtnText='Yes'
        closeBtnText='No'
        action={() => cancelAppointment(appointment.id)}
        icon={<CircleAlert />}
      />
    </>
  )
}
