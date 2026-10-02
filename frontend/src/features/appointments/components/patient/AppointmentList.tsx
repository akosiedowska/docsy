import { Loader, Stack, Text } from '@mantine/core'

import { AppointmentCard } from './AppointmentCard'
import { useAppointments } from '../../hooks/useAppointments'
import type { Appointment } from '../../types'

const AppointmentList = () => {
  const { isPending, isError, data: appointments, error } = useAppointments()

  if (isPending) {
    return <Loader />
  }

  if (isError) {
    return <Text color='error'>{error.message}</Text>
  }

  const nextAppointments = appointments.filter(
    (a) => a.conducted === false && a.cancelled === false,
  )
  const previousAppointments = appointments.filter((a) => a.conducted === true)

  return (
    <Stack gap='40px' align='center' w='100%' maw={500} mx='auto'>
      <Stack gap='16px' w='100%'>
        <Text fw='700' size='lg'>
          Upcoming visits
        </Text>
        {nextAppointments.length > 0 ? (
          nextAppointments.map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment.id} variant='upcoming' />
          ))
        ) : (
          <Text>No appointments yet.</Text>
        )}
      </Stack>
      <Stack gap='16px' w='100%'>
        <Text fw='700' size='lg'>
          Recent visits
        </Text>
        {previousAppointments.length > 0 ? (
          previousAppointments.map((appointment: Appointment) => (
            <AppointmentCard appointment={appointment} key={appointment.id} variant='recent' />
          ))
        ) : (
          <Text>No appointments yet.</Text>
        )}
      </Stack>
    </Stack>
  )
}

export default AppointmentList
