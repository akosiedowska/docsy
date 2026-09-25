import type { FileRouteTypes } from '../routeTree.gen'

type AppPath = FileRouteTypes['to']

export const paths = {
  HOME: '/',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  RESERVATION: '/reservation',
  PROFILE: '/profile',
} satisfies Record<string, AppPath>
