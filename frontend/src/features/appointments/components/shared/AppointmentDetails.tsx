import { Box, Button, Card, Group, Stack, Text } from '@mantine/core'

import classes from './AppointmentDetails.module.css'
import type { AppointmentDetail } from '../../types'
import { useAuthStore } from '../../../../stores/authStore'
import { palette } from '../../../../styles/colors'
import { Pencil } from 'lucide-react'

type AppointmentDetailsProps = { appointment: AppointmentDetail }

const AppointmentDetails = ({ appointment }: AppointmentDetailsProps) => {
  const { user } = useAuthStore()
  const date = new Date(appointment?.slot?.date)

  return (
    <Stack>
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
      <Card w='100%' padding='18' withBorder>
        <Text tt='uppercase' c='violet.7' fw={600} mb={10}>
          Patient
        </Text>
        <Stack>
          <Stack gap={1}>
            <Text c={palette.grayText} size='12px'>
              First name
            </Text>
            <Text fw={600}>{appointment.patient.user.firstName}</Text>
          </Stack>
          <Stack gap={1}>
            <Text c={palette.grayText} size='12px'>
              Last name
            </Text>
            <Text fw={600}>{appointment.patient.user.lastName}</Text>
          </Stack>
          <Stack gap={1}>
            <Text c={palette.grayText} size='12px'>
              Date of birth
            </Text>
            <Text fw={600}>00/00/2000</Text>
          </Stack>
        </Stack>
      </Card>
      <Card w='100%' padding='18' withBorder>
        <Group justify='space-between' align='center'>
          <Text tt='uppercase' c='violet.7' fw={600} mb={10}>
            Visit summary
          </Text>
          <Button leftSection={<Pencil size={16} />}>Edit</Button>
        </Group>
        <Stack>
          <Text c={palette.grayText} size='12px'>
            Recommendations
          </Text>
          <Box bg='lime.1' bdrs={10} p='12 16'>
            blablablalblablab dsgsdgsdgs
          </Box>
        </Stack>
      </Card>
    </Stack>
  )
}

export default AppointmentDetails
