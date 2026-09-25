import { createFileRoute } from '@tanstack/react-router'
import ReservationPage from '../../pages/patient/ReservationPage'

export const Route = createFileRoute('/_auth/reservation')({
  component: ReservationPage,
})
