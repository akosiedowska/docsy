import { createFileRoute } from '@tanstack/react-router'

import { useAuthStore } from '../../../stores/authStore'
import PatientDashboardPage from '../../../pages/patient/DashboardPage'
import DoctorDashboardPage from '../../../pages/doctor/DashboardPage'
import AdminDashboardPage from '../../../pages/admin/DashboardPage'

const DashboardIndex = () => {
  const role = useAuthStore((s) => s.user?.role)

  switch (role) {
    case 'DOCTOR':
      return <DoctorDashboardPage />
    case 'ADMIN':
      return <AdminDashboardPage />
    default:
      return <PatientDashboardPage />
  }
}

export const Route = createFileRoute('/_auth/dashboard/')({
  component: DashboardIndex,
})
