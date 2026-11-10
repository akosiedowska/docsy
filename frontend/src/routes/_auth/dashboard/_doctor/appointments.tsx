import { createFileRoute } from '@tanstack/react-router'

import AppointmentsPage from '../../../../pages/shared/AppointmentsPage'

export const Route = createFileRoute('/_auth/dashboard/_doctor/appointments')({
  component: AppointmentsPage,
})
