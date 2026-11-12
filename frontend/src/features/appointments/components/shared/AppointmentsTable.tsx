import { rowSortingFeature, tableFeatures, useTable } from '@tanstack/react-table'
import type { ColumnDef, OnChangeFn, SortingState } from '@tanstack/react-table'
import { Center, Group, Select, Table, Text, UnstyledButton } from '@mantine/core'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { conductedOptions, isConductedFilter } from '../../conductedFilter'
import type { ConductedFilter } from '../../conductedFilter'
import type { AppointmentDetail } from '../../types'
import { formatShortDate } from '../../../../utils/helpers'
import { paths } from '../../../../app/paths'
import ButtonLink from '../../../../components/ui/ButtonLink'

type AppointmentsTableProps = {
  items: AppointmentDetail[]
  total: number
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  conducted: ConductedFilter
  onConductedChange: (value: ConductedFilter) => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

const features = tableFeatures({ rowSortingFeature })

const columns: Array<ColumnDef<typeof features, AppointmentDetail>> = [
  {
    id: 'firstName',
    accessorFn: (row) => row.patient.user.firstName,
    header: 'First name',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    id: 'lastName',
    accessorFn: (row) => row.patient.user.lastName,
    header: 'Last name',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    id: 'date',
    accessorFn: (row) => row.slot.date,
    header: 'Date',
    cell: (info) => <p>{formatShortDate(info.getValue<string>())}</p>,
  },
  {
    id: 'conducted',
    accessorFn: (row) => row.conducted,
    header: 'Status',
    enableSorting: false,
    cell: (info) => <p>{info.getValue<boolean>() ? 'Conducted' : 'Not conducted'}</p>,
  },
  {
    id: 'address',
    accessorFn: (row) => row.slot.address,
    header: 'Address',
    enableSorting: false,
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    id: 'edit',
    header: 'Edit',
    enableSorting: false,
    cell: ({ row }) => (
      <ButtonLink
        size='compact-md'
        px={14}
        fw={500}
        to={paths.APPOINTMENT}
        params={{ appointmentId: row.original.id }}
        state={{ fromTable: true }}
      >
        Edit
      </ButtonLink>
    ),
  },
]

const ariaSortValues = { asc: 'ascending', desc: 'descending' } as const

const AppointmentsTable = ({
  items,
  total,
  sorting,
  onSortingChange,
  conducted,
  onConductedChange,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: AppointmentsTableProps) => {
  const table = useTable({
    key: 'appointments-table',
    features,
    columns,
    data: items,
    state: { sorting },
    onSortingChange,
    manualSorting: true,
    enableMultiSort: false,
    enableSortingRemoval: false,
  })

  const handleBottomReached = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }

  return (
    <>
      <Table.ScrollContainer
        minWidth={700}
        maxHeight='calc(100vh - 260px)'
        scrollAreaProps={{ onBottomReached: handleBottomReached }}
      >
        <Table
          highlightOnHover
          withColumnBorders
          withRowBorders
          withTableBorder
          striped
          stripedColor='lime.0'
          bg='white'
          verticalSpacing='sm'
          stickyHeader
          stickyHeaderOffset={0}
        >
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortDirection = header.column.getIsSorted()
                  const SortIcon =
                    sortDirection === 'asc'
                      ? ArrowUp
                      : sortDirection === 'desc'
                        ? ArrowDown
                        : ArrowUpDown

                  return (
                    <Table.Th
                      key={header.id}
                      aria-sort={sortDirection ? ariaSortValues[sortDirection] : undefined}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <UnstyledButton
                          onClick={header.column.getToggleSortingHandler()}
                          fw='inherit'
                        >
                          <Group gap={6} wrap='nowrap'>
                            <table.FlexRender header={header} />
                            <SortIcon size={14} opacity={sortDirection ? 1 : 0.45} />
                          </Group>
                        </UnstyledButton>
                      ) : header.column.id === 'conducted' ? (
                        <Select
                          aria-label='Filter by status'
                          size='xs'
                          data={conductedOptions}
                          value={conducted}
                          onChange={(value) => {
                            if (isConductedFilter(value)) onConductedChange(value)
                          }}
                          allowDeselect={false}
                          w={150}
                        />
                      ) : (
                        <table.FlexRender header={header} />
                      )}
                    </Table.Th>
                  )
                })}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {items.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <Center py='xl'>No appointments found.</Center>
                </Table.Td>
              </Table.Tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Text size='sm' c='dimmed'>
        Showing {items.length} of {total}
      </Text>
    </>
  )
}

export default AppointmentsTable
