import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { useAuthStore } from '../stores/authStore'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

useAuthStore.subscribe((state, prevState) => {
  if (state.isAuthenticated !== prevState.isAuthenticated) {
    router.invalidate()
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
