import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../pages/auth/Loginpage'

export const Route = createFileRoute('/')({
  component: LoginPage,
})
