import { createFileRoute, Outlet } from '@tanstack/react-router'

import { requireRole } from '../../../features/auth/guards'

export const Route = createFileRoute('/_auth/dashboard/_doctor')({
  beforeLoad: requireRole('DOCTOR'),
  component: Outlet,
})
