import { Stack } from '@mantine/core'

import type { AppointmentDetail } from '../../types'
import VisitSummaryCard from './VisitSummaryCard'
import PatientDetailsCard from './PatientDetailsCard'
import AppointmentInfoCard from './AppointmentInfoCard'

type AppointmentDetailsProps = { appointment: AppointmentDetail }

const AppointmentDetails = ({ appointment }: AppointmentDetailsProps) => {
  return (
    <Stack>
      <AppointmentInfoCard appointment={appointment} />
      <PatientDetailsCard appointment={appointment} />
      <VisitSummaryCard appointment={appointment} />
    </Stack>
  )
}

export default AppointmentDetails
