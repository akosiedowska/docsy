import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/_doctor/schedule')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/_doctor/schedule"!</div>
}
