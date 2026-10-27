import { Box, Card, Group, Stack, Text } from '@mantine/core'

import type { AppointmentDetail } from '../../types'
import { useAuthStore } from '../../../../stores/authStore'

import classes from './AppointmentInfoCard.module.css'

type AppointmentInfoCardProps = { appointment: AppointmentDetail }

const AppointmentInfoCard = ({ appointment }: AppointmentInfoCardProps) => {
  const { user } = useAuthStore()
  const date = new Date(appointment?.slot?.date)

  return (
    <Card
      w='100%'
      padding='18'
      withBorder
      lh={1}
      className={`${classes.card} ${classes[appointment.conducted ? 'recent' : 'upcoming']}`}
    >
      <Group>
        <Box
          className={`${classes.dateBox} ${classes[`${appointment.conducted ? 'recent' : 'upcoming'}Box`]}`}
        >
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
        <Stack gap='6'>
          <Text lh={1} fw='700' size='xl'>
            {appointment.slot.doctor.specialization} Consultation
          </Text>
          {user?.role !== 'DOCTOR' && (
            <Text lh={1} fw='600'>
              {appointment.slot.doctor.user.firstName} {appointment.slot.doctor.user.lastName}
            </Text>
          )}
          <Text lh={1} textWrap='wrap'>
            {appointment.slot.address}
          </Text>
        </Stack>
      </Group>
    </Card>
  )
}

export default AppointmentInfoCard
