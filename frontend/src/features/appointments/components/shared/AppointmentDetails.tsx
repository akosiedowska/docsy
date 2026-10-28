import { Button, Stack } from '@mantine/core'

import type { AppointmentDetail } from '../../types'
import VisitSummaryCard from './VisitSummaryCard'
import PatientDetailsCard from './PatientDetailsCard'
import AppointmentInfoCard from './AppointmentInfoCard'
import { useAuthStore } from '../../../../stores/authStore'
import AppointmentActionButtons from './AppointmentActionButtons'

type AppointmentDetailsProps = { appointment: AppointmentDetail }

const AppointmentDetails = ({ appointment }: AppointmentDetailsProps) => {
  const { user } = useAuthStore()

  return (
    <Stack>
      <AppointmentInfoCard appointment={appointment} />
      {user?.role !== 'PATIENT' && <PatientDetailsCard appointment={appointment} />}
      <VisitSummaryCard appointment={appointment} />
      {user?.role === 'PATIENT' && !appointment.conducted && <Button>Cancel</Button>}
      {user?.role !== 'DOCTOR' && !appointment.conducted && (
        <AppointmentActionButtons appointment={appointment} />
      )}
    </Stack>
  )
}

export default AppointmentDetails
