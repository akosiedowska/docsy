import type { SortingState } from '@tanstack/react-table'

import type { AppointmentSortBy, AppointmentsListParams } from './types'

export const DEFAULT_SORTING: SortingState = [{ id: 'date', desc: true }]

const sortByColumnId: Partial<Record<string, AppointmentSortBy>> = {
  firstName: 'patientFirstName',
  lastName: 'patientLastName',
  date: 'date',
}

export const toSortParams = (
  sorting: SortingState,
): Pick<AppointmentsListParams, 'sortBy' | 'sortOrder'> => {
  const [sort] = sorting
  const sortBy = sort ? sortByColumnId[sort.id] : undefined
  if (!sort || !sortBy) return { sortBy: 'date', sortOrder: 'desc' }

  return { sortBy, sortOrder: sort.desc ? 'desc' : 'asc' }
}
