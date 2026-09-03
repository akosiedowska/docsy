import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '../../../api/types'
import { bookAppointment } from '../api'
import { appointmentsKeys } from '../queryKeys'
import type { Appointment, CreateAppointmentBody } from '../types'

export function useBookAppointment() {
  const queryClient = useQueryClient()

  return useMutation<Appointment, AxiosError<ApiErrorResponse>, CreateAppointmentBody>({
    mutationFn: bookAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentsKeys.appointments })
      queryClient.invalidateQueries({ queryKey: appointmentsKeys.availableSlots.all })
    },
  })
}
