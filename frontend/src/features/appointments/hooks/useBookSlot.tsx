import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '../../../api/types'
import { bookSlot } from '../api'
import { appointmentsKeys } from '../queryKeys'
import type { AvailableSlot } from '../types'

type BookSlotVariables = {
  id: string
  booked: boolean
}

export function useBookSlot() {
  const queryClient = useQueryClient()

  return useMutation<AvailableSlot, AxiosError<ApiErrorResponse>, BookSlotVariables>({
    mutationFn: ({ id, booked }) => bookSlot(id, { booked }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentsKeys.availableSlots.all })
    },
  })
}
