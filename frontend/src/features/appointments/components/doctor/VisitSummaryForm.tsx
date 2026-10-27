import { Checkbox, Stack, Text, Textarea } from '@mantine/core'
import { z } from 'zod'

import type { AppointmentDetail } from '../../types'
import { palette } from '../../../../styles/colors'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type VisitSummaryFormProps = {
  appointment: AppointmentDetail
  handleSave: (values: AppointmentFormValues) => void
  formId: string
}

const AppointmentFormValuesSchema = z.object({
  conducted: z.boolean(),
  description: z.string(),
  recommendations: z.string(),
})

export type AppointmentFormValues = z.infer<typeof AppointmentFormValuesSchema>

const VisitSummaryForm = ({ appointment, handleSave, formId }: VisitSummaryFormProps) => {
  const { register, handleSubmit } = useForm<AppointmentFormValues>({
    resolver: zodResolver(AppointmentFormValuesSchema),
  })

  return (
    <Stack gap={20} component='form' onSubmit={handleSubmit(handleSave)} id={formId}>
      <Checkbox
        defaultChecked={appointment.conducted}
        label='Conducted'
        {...register('conducted')}
      />
      <Stack gap={10}>
        <Text c={palette.grayText} size='12px'>
          Description
        </Text>
        <Textarea
          placeholder='Description'
          defaultValue={appointment.description ?? ''}
          {...register('description')}
        />
      </Stack>
      <Stack gap={10}>
        <Text c={palette.grayText} size='12px'>
          Recommendations
        </Text>
        <Textarea
          defaultValue={appointment.recommendations ?? ''}
          {...register('recommendations')}
          styles={{ input: { backgroundColor: 'var(--mantine-color-lime-1)' } }}
        />
      </Stack>
    </Stack>
  )
}

export default VisitSummaryForm
