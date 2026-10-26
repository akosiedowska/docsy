import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '../../pages/shared/ProfilePage'

export const Route = createFileRoute('/_auth/profile')({
  component: ProfilePage,
})
