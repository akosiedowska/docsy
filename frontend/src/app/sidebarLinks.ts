import { CalendarPlus, ClipboardList, Users, type LucideIcon } from 'lucide-react'

import { paths, type AppPath } from './paths'

export interface SidebarLink {
  label: string
  to: AppPath
  icon: LucideIcon
}

export const staffNav: Record<'DOCTOR' | 'ADMIN', SidebarLink[]> = {
  DOCTOR: [
    { label: 'Dashboard', to: paths.DASHBOARD, icon: ClipboardList },
    { label: 'Schedule', to: paths.SCHEDULE, icon: CalendarPlus },
  ],
  ADMIN: [
    { label: 'Dashboard', to: paths.DASHBOARD, icon: ClipboardList },
    { label: 'Doctors', to: paths.DOCTORS, icon: Users },
  ],
}
