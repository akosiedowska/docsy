import { createFileRoute } from '@tanstack/react-router'

import AppointmentsPage from '../../../../pages/shared/AppointmentsPage'
import { useAppointmentsFilterStore } from '../../../../stores/appointmentsFilterStore'

export const Route = createFileRoute('/_auth/dashboard/_doctor/appointments')({
  component: AppointmentsPage,
  beforeLoad: ({ preload }) => {
    if (preload) return

    const { restoreOnReturn, setRestoreOnReturn, reset } = useAppointmentsFilterStore.getState()
    if (restoreOnReturn) setRestoreOnReturn(false)
    else reset()
  },
})
