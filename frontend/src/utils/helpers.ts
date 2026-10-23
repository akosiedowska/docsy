import type { AuthUser } from '../features/auth/types'

export const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

export const getDisplayName = (user?: Pick<AuthUser, 'firstName' | 'lastName' | 'role'> | null) => {
  if (!user) return ''
  return user.role === 'DOCTOR' ? `Dr. ${user.lastName}` : user.firstName
}

export const getGreeting = () => {
  const hour = new Date().getHours()

  if (hour < 12) {
    return 'Good morning'
  }
  if (hour < 18) {
    return 'Good afternoon'
  }
  return 'Good evening'
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
