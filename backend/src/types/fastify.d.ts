import type { CurrentUser } from './current-user'

declare module 'fastify' {
  interface FastifyRequest {
    currentUser: CurrentUser
  }
}
