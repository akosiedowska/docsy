import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../pages/auth/Loginpage'
import { loginSearchSchema } from '../features/auth/schemas'

export const Route = createFileRoute('/')({
  validateSearch: loginSearchSchema,
  component: LoginPage,
})
