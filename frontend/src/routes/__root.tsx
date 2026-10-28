import { createRootRoute } from '@tanstack/react-router'
import AppLayout from '../layouts/AppLayout'
import NotFoundPage from '../pages/common/NotFoundPage'
import ErrorPage from '../pages/common/ErrorPage'

export const Route = createRootRoute({
  component: AppLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})
