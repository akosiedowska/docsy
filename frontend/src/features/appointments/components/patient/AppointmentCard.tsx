import { useState } from 'react'
import { Box, Button, Card, Group, Stack, Text } from '@mantine/core'
import { CircleAlert } from 'lucide-react'

import type { Appointment } from '../../types'
import { useCancelAppointment } from '../../hooks/useCancelAppoinment'
import AlertDialog from '../../../../components/ui/AlertDialog'

import classes from './AppointmentCard.module.css'

type AppointmentCardProps = {
  appointment: Appointment
  variant: 'upcoming' | 'recent'
}

export const AppointmentCard = ({ appointment, variant }: AppointmentCardProps) => {
  const { mutate: cancelAppointment } = useCancelAppointment()
  const [openAlertDialog, setOpenDialog] = useState(false)

  const handleCloseAlertDialog = () => setOpenDialog(false)

  const date = new Date(appointment.slot.date)

  return (
    <>
      <Card
        w='100%'
        padding='18'
        withBorder
        lh={1}
        className={`${classes.card} ${classes[variant]}`}
      >
        <Stack>
          <Group justify='space-between'>
            <Stack gap='6'>
              <Text lh={1} fw='700'>
                {appointment.slot.doctor.user.firstName} {appointment.slot.doctor.user.lastName}
              </Text>
              <Text lh={1} c='grayText' size='13.5' mb='2'>
                {appointment.slot.doctor.specialization}
              </Text>
              <Text lh={1} textWrap='wrap'>
                {appointment.slot.address}
              </Text>
            </Stack>

            <Box className={`${classes.dateBox} ${classes[`${variant}Date`]}`}>
              <Box className={classes.date}>
                <Text className={classes.day}>{date.getDate()}</Text>
                <Text className={classes.month}>
                  {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </Text>
              </Box>
              <Text className={classes.time}>
                {date.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </Text>
            </Box>
          </Group>

          {appointment.conducted !== true && (
            <Group justify='end'>
              <Button onClick={() => setOpenDialog(true)} variant='default'>
                Cancel
              </Button>
              {/* to be implemented */}
              {/* <Button>Reschedule</Button> */}
            </Group>
          )}
        </Stack>
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
