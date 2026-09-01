import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelAppointment } from '../api'
import { appointmentsKeys } from '../queryKeys'
import type { Appointment } from '../types'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '../../../api/types'

export function useCancelAppointment() {
  const queryClient = useQueryClient()

  return useMutation<Appointment, AxiosError<ApiErrorResponse>, string>({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentsKeys.appointments })
      queryClient.invalidateQueries({ queryKey: appointmentsKeys.availableSlots.all })
    },
  })
}
