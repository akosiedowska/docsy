import type { UseQueryResult } from '@tanstack/react-query'

import type { DoctorAppointment } from '../../types'
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner'
import { Stack, Text } from '@mantine/core'
import DoctorAppointmentCard from './DoctorAppointmentCard'
import { palette } from '../../../../styles/colors'
import { getApiErrorMessage } from '../../../../api/getApiErrorMesage'

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

    return data.map((appointment) => (
      <DoctorAppointmentCard appointment={appointment} key={appointment.id} variant={variant} />
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
