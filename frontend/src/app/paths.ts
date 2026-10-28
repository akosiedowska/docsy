import type { FileRouteTypes } from '../routeTree.gen'

export type AppPath = FileRouteTypes['to']

export const paths = {
  HOME: '/',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  DOCTORS: '/dashboard/doctors',
  SCHEDULE: '/dashboard/schedule',
  RESERVATION: '/reservation',
  PROFILE: '/profile',
  APPOINTMENT: '/appointments/$appointmentId',
} satisfies Record<string, AppPath>
