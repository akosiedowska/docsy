import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../../pages/patient/DashboardPage'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})
