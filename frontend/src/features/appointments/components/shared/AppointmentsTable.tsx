import { tableFeatures, useTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import type { AppointmentDetail } from '../../types'
import { formatShortDate } from '../../../../utils/helpers'

type AppointmentsTableProps = {
  items: AppointmentDetail[]
}

const features = tableFeatures({})

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
    accessorFn: (row) => row.slot.date,
    header: 'Date',
    cell: (info) => <p>{formatShortDate(info.getValue<string>())}</p>,
  },
  {
    accessorKey: 'conducted',
    header: () => 'Conducted',
    cell: (info) => <p>{info.getValue<boolean>() ? 'Yes' : 'No'}</p>,
  },
  {
    accessorFn: (row) => row.slot.address,
    header: 'Address',
    cell: (info) => <p>{info.getValue<string>()}</p>,
  },
]

const AppointmentsTable = ({ items }: AppointmentsTableProps) => {
  const table = useTable({
    key: 'appointments-table',
    features,
    columns,
    data: items,
  })
  return (
    <>
      <div>AppointmentsTable</div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default AppointmentsTable
