export type ConductedFilter = 'all' | 'yes' | 'no'

export const conductedOptions: Array<{ value: ConductedFilter; label: string }> = [
  { value: 'all', label: 'All statuses' },
  { value: 'yes', label: 'Conducted' },
  { value: 'no', label: 'Not conducted' },
]

export const conductedParams = { all: undefined, yes: true, no: false } as const

export const isConductedFilter = (value: string | null): value is ConductedFilter =>
  conductedOptions.some((option) => option.value === value)
