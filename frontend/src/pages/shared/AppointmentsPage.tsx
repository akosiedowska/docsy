import { useState } from 'react'
import type { SortingState } from '@tanstack/react-table'
import { Stack, Text, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { Search } from 'lucide-react'

import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import AppointmentsTable from '../../features/appointments/components/shared/AppointmentsTable'
import { useInfiniteAppointments } from '../../features/appointments/hooks/useInfiniteAppointments'
import { conductedParams } from '../../features/appointments/conductedFilter'
import type { ConductedFilter } from '../../features/appointments/conductedFilter'
import { DEFAULT_SORTING, toSortParams } from '../../features/appointments/sorting'
import { palette } from '../../styles/colors'

const SEARCH_DEBOUNCE_MS = 300

const AppointmentsPage = () => {
  const [search, setSearch] = useState('')
  const [conducted, setConducted] = useState<ConductedFilter>('all')
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)
  const [debouncedSearch] = useDebouncedValue(search, SEARCH_DEBOUNCE_MS)

  const { data, isPending, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteAppointments({
      search: debouncedSearch.trim() || undefined,
      conducted: conductedParams[conducted],
      ...toSortParams(sorting),
    })

  return (
    <Stack flex={1} mih={0}>
      <TextInput
        aria-label='Search appointments by patient name'
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder='Search by patient name...'
        leftSection={<Search size={16} />}
        w={{ base: '100%', sm: 360 }}
      />
      {isPending ? (
        <LoadingSpinner />
      ) : isError ? (
        <Text c={palette.alert}>Failed to load appointments.</Text>
      ) : (
        <AppointmentsTable
          items={data.pages.flatMap((page) => page.items)}
          total={data.pages[0].total}
          sorting={sorting}
          onSortingChange={setSorting}
          conducted={conducted}
          onConductedChange={setConducted}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </Stack>
  )
}

export default AppointmentsPage
