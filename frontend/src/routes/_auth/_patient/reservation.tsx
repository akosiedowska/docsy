import { createFileRoute } from '@tanstack/react-router'
import ReservationPage from '../../../pages/patient/ReservationPage'

export const Route = createFileRoute('/_auth/_patient/reservation')({
  component: ReservationPage,
})
