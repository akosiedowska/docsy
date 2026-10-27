import { Box, Button, Card, Checkbox, Group, Stack, Text } from '@mantine/core'
import { Pencil, Save } from 'lucide-react'

import { palette } from '../../../../styles/colors'
import type { AppointmentDetail } from '../../types'
import { useState } from 'react'
import { useAuthStore } from '../../../../stores/authStore'
import VisitSummaryForm, { type AppointmentFormValues } from '../doctor/VisitSummaryForm'
import { useUpdateAppointment } from '../../hooks/useUpdateAppointment'

type VisitSummaryCardProps = { appointment: AppointmentDetail }

const FORM_ID = 'visit-summary-form'

const VisitSummaryCard = ({ appointment }: VisitSummaryCardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const { user } = useAuthStore()
  const { mutate, isPending } = useUpdateAppointment()

  const handleSave = (values: AppointmentFormValues) => {
    console.log('saving')
    mutate({ id: appointment.id, payload: values }, { onSuccess: () => setIsEditing(false) })
  }

  const handleEdit = () => {
    setIsEditing(true)
    console.log('editing')
  }

  return (
    <Card w='100%' padding='18' withBorder>
      <Stack gap={12}>
        <Group justify='space-between'>
          <Text tt='uppercase' c='violet.7' fw={600} mb={10}>
            Visit summary
          </Text>
          {user?.role !== 'PATIENT' &&
            (isEditing ? (
              <Button
                key='save'
                type='submit'
                form={FORM_ID}
                loading={isPending}
                leftSection={<Save size={16} />}
              >
                Save
              </Button>
            ) : (
              <Button
                key='edit'
                type='button'
                leftSection={<Pencil size={16} />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            ))}
        </Group>
        {isEditing ? (
          <VisitSummaryForm appointment={appointment} handleSave={handleSave} formId={FORM_ID} />
        ) : (
          <Stack gap={20}>
            <Checkbox checked={appointment.conducted} label='Conducted' />
            <Stack gap={10}>
              <Text c={palette.grayText} size='12px'>
                Description
              </Text>
              <Box bdrs={10} p='12 16' bd='1px solid gray.3' mih={50}>
                {appointment.description ? (
                  <Text>{appointment.description}</Text>
                ) : (
                  <Text c={palette.grayText} fs='italic'>
                    No description provided
                  </Text>
                )}
              </Box>
            </Stack>
            <Stack gap={10}>
              <Text c={palette.grayText} size='12px'>
                Recommendations
              </Text>
              <Box bg='lime.1' bdrs={10} p='12 16' mih={50}>
                {appointment.recommendations ? (
                  <Text>{appointment.recommendations}</Text>
                ) : (
                  <Text c={palette.grayText} fs='italic'>
                    No recommendations provided
                  </Text>
                )}
              </Box>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Card>
  )
}

export default VisitSummaryCard
