import {
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Stack, Table, TextInput } from '@mantine/core'
import { Search } from 'lucide-react'

import type { AppointmentDetail } from '../../types'
import { formatShortDate } from '../../../../utils/helpers'
import { paths } from '../../../../app/paths'
import ButtonLink from '../../../../components/ui/ButtonLink'

type AppointmentsTableProps = {
  items: AppointmentDetail[]
}

const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
  },
})

const columns: Array<ColumnDef<typeof features, AppointmentDetail>> = [
  {
    accessorFn: (row) => row.patient.user.firstName,
    header: 'First name',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    accessorFn: (row) => row.patient.user.lastName,
    header: 'Last name',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    accessorFn: (row) => formatShortDate(row.slot.date),
    header: 'Date',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    accessorFn: (row) => (row.conducted ? 'Yes' : 'No'),
    id: 'conducted',
    header: 'Conducted',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    accessorFn: (row) => row.slot.address,
    header: 'Address',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
  {
    id: 'edit',
    header: () => 'Edit',
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

const AppointmentsTable = ({ items }: AppointmentsTableProps) => {
  const table = useTable(
    {
      key: 'appointments-table',
      features,
      columns,
      data: items,
      globalFilterFn: 'includesString',
    },
    (state) => state,
  )
  return (
    <Stack>
      <TextInput
        aria-label='Search appointments'
        // value={globalFilter}
        onChange={(event) => table.setGlobalFilter(event.currentTarget.value)}
        placeholder='Search all columns...'
        leftSection={<Search size={16} />}
        w={{ base: '100%', sm: 360 }}
      />
      <Table.ScrollContainer minWidth={700} maxHeight='calc(100vh - 227px)'>
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
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  )
}

export default AppointmentsTable
