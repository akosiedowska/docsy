import { Box, Button, Card, Flex, Group, Text } from '@mantine/core'
import { Pencil } from 'lucide-react'

import type { DoctorAppointment } from '../../types'

import classes from './DoctorAppointmentCard.module.css'
import { palette } from '../../../../styles/colors'

type DoctorAppointmentCardProps = {
  appointment: DoctorAppointment
  variant: 'upcoming' | 'recent'
}

const DoctorAppointmentCard = ({ appointment, variant }: DoctorAppointmentCardProps) => {
  return (
    <Card
      w='100%'
      padding='18'
      withBorder
      lh={1}
      orientation='horizontal'
      className={`${classes.card} ${classes[variant]}`}
    >
      <Card.Section className={`${classes[`${variant}Box`]}`} px='8'>
        <Flex align='center' justify='center' w='100%' h='100%'>
          <Text fw='600'>
            {new Date(appointment.slot.date).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </Text>
        </Flex>
      </Card.Section>
      <Card.Section inheritPadding px='18' flex={1}>
        <Group justify='space-between'>
          <Box>
            <Group gap='2'>
              <Text fw='600'>
                {appointment.patient.user.firstName} {appointment.patient.user.lastName}
              </Text>
            </Group>
            <Text variant='body2' color='text.secondary'>
              {new Date(appointment.slot.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            </Text>
            <Text c={palette.grayText} size='xs'>
              {appointment.slot.address}
            </Text>
          </Box>
          <Box>
            <Button leftSection={<Pencil size={16} />} variant='light'>
              Edit
            </Button>
          </Box>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default DoctorAppointmentCard
