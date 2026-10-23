import type { UseQueryResult } from '@tanstack/react-query'
import { Group, Stack, Text } from '@mantine/core'
import { SquareArrowRight } from 'lucide-react'

import DoctorAppointmentCard from './DoctorAppointmentCard'
import type { DoctorAppointment } from '../../types'
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner'
import { palette } from '../../../../styles/colors'
import { getApiErrorMessage } from '../../../../api/getApiErrorMesage'
import { formatDate } from '../../../../utils/helpers'

type AppointmentSectionProps = {
  title: string
  variant: 'upcoming' | 'recent'
  query: UseQueryResult<DoctorAppointment[], Error>
}

const AppointmentSection = ({ title, variant, query }: AppointmentSectionProps) => {
  const { isPending, isError, error, data } = query

  const renderContent = () => {
    if (isPending) return <LoadingSpinner />
    if (isError) return <Text c={palette.alert}>{getApiErrorMessage(error)}</Text>
    if (data.length === 0) return <Text>No appointments yet.</Text>

    const groups = data.reduce((acc, appointment) => {
      const date = formatDate(appointment.slot.date)
      acc.set(date, [...(acc.get(date) ?? []), appointment])
      return acc
    }, new Map<string, DoctorAppointment[]>())

    const today = formatDate(new Date().toISOString())

    return Array.from(groups, ([date, appointments]) => (
      <Stack key={date} gap='8'>
        <Group gap='6'>
          {date === today ? <SquareArrowRight color={palette.violet} size='20' /> : null}
          <Text fw='600' c={date === today ? 'violet.6' : 'dimmed'}>
            {date}
          </Text>
        </Group>
        {appointments.map((appointment) => (
          <DoctorAppointmentCard appointment={appointment} key={appointment.id} variant={variant} />
        ))}
      </Stack>
    ))
  }

  return (
    <Stack gap='16px' w='100%'>
      <Text fw='700' size='lg'>
        {title}
      </Text>
      {renderContent()}
    </Stack>
  )
}

export default AppointmentSection
