import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAppointmentById } from '../api'
import type { AppointmentDetail, UpdateAppointmentBody } from '../types'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../../../api/types'
import { appointmentsKeys } from '../queryKeys'

type UpdateAppointmentVariables = {
  id: string
  payload: UpdateAppointmentBody
}

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient()

  return useMutation<AppointmentDetail, AxiosError<ApiErrorResponse>, UpdateAppointmentVariables>({
    mutationFn: ({ id, payload }) => updateAppointmentById(id, payload),
    onSuccess: async (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: appointmentsKeys.appointments })
      await queryClient.invalidateQueries({ queryKey: appointmentsKeys.appointment(id) })
    },
  })
}
