import { createFileRoute, Outlet } from '@tanstack/react-router'

import { requireRole } from '../../features/auth/guards'

export const Route = createFileRoute('/_auth/_patient')({
  beforeLoad: requireRole('PATIENT'),
  component: Outlet,
})
