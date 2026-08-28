import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '../../../api/types'
import { bookSlot } from '../api'
import type { AvailableSlot } from '../types'

type BookSlotVariables = {
  id: string
  booked: boolean
}

export function useBookSlot() {
  return useMutation<AvailableSlot, AxiosError<ApiErrorResponse>, BookSlotVariables>({
    mutationFn: ({ id, booked }) => bookSlot(id, { booked }),
  })
}
