import { create } from 'zustand'
import type { ConductedFilter } from '../features/appointments/conductedFilter'
import type { OnChangeFn, SortingState } from '@tanstack/react-table'
import { DEFAULT_SORTING } from '../features/appointments/sorting'

type AppointmentsFilterState = {
  search: string
  conducted: ConductedFilter
  sorting: SortingState
  setSearch: (search: string) => void
  setConducted: (conducted: ConductedFilter) => void
  setSorting: OnChangeFn<SortingState>
  reset: () => void
  restoreOnReturn: boolean
  setRestoreOnReturn: (value: boolean) => void
}

const initialState = { search: '', conducted: 'all', sorting: DEFAULT_SORTING } as const

export const useAppointmentsFilterStore = create<AppointmentsFilterState>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setConducted: (conducted) => set({ conducted }),
  setSorting: (updater) =>
    set((state) => ({
      sorting: typeof updater === 'function' ? updater(state.sorting) : updater,
    })),
  reset: () => set(initialState),
  restoreOnReturn: false,
  setRestoreOnReturn: (restoreOnReturn) => set({ restoreOnReturn }),
}))
