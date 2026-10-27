import { Card, Stack, Text } from '@mantine/core'

import { palette } from '../../../../styles/colors'
import type { AppointmentDetail } from '../../types'

type PatientDetailsProps = { appointment: AppointmentDetail }

const PatientDetailsCard = ({ appointment }: PatientDetailsProps) => {
  return (
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
  )
}

export default PatientDetailsCard
