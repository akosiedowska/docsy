import { createRootRoute } from '@tanstack/react-router'
import AppLayout from '../layouts/AppLayout'
import NotFoundPage from '../pages/NotFoundPage'
import ErrorPage from '../pages/ErrorPage'

export const Route = createRootRoute({
  component: AppLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})
