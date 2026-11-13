import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { appointmentsKeys } from '../queryKeys'
import { getAppointmentsPage } from '../api'
import type { AppointmentsListParams } from '../types'

const PAGE_SIZE = 30

export const useInfiniteAppointments = (params: AppointmentsListParams) => {
  return useInfiniteQuery({
    queryKey: appointmentsKeys.appointmentsList(params),
    queryFn: ({ pageParam }) =>
      getAppointmentsPage({ ...params, offset: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((count, page) => count + page.items.length, 0)
      return loadedCount < lastPage.total ? loadedCount : undefined
    },
    placeholderData: keepPreviousData,
  })
}
