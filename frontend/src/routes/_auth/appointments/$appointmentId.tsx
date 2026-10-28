import { createFileRoute } from '@tanstack/react-router'

import AppointmentDetailPage from '../../../pages/shared/AppointmentDetailPage'

export const Route = createFileRoute('/_auth/appointments/$appointmentId')({
  component: AppointmentDetailPage,
})
