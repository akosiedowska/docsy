import { createFileRoute } from '@tanstack/react-router'
// import DashboardPage from '../../pages/patient/DashboardPage'
import DashboardShell from '../../layouts/DashboardShell'

// export const Route = createFileRoute('/_auth/dashboard')({
//   component: DashboardPage,
// })

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardShell,
})
