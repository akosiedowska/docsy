export const getInitials = (firstName?: string, lastName?: string) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

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
