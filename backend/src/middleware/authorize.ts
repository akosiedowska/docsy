import type { FastifyReply, FastifyRequest } from 'fastify'

import { ForbiddenError, NotFoundError } from '../errors/http-error'
import type { CurrentUser } from '../types/current-user'

type LoadResource<T> = (request: FastifyRequest) => Promise<T | null | undefined>
type CheckAccess<T> = (user: CurrentUser, resource: T) => boolean

export interface AuthorizePolicy<T> {
  getResource: LoadResource<T>
  isAllowed: CheckAccess<T>
  notFoundMessage?: string
  forbiddenMessage?: string
}

export function authorize<T>(policy: AuthorizePolicy<T>) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    const resource = await policy.getResource(request)
    if (!resource) {
      throw new NotFoundError(policy.notFoundMessage ?? 'Resource not found')
    }

    if (!policy.isAllowed(request.currentUser, resource)) {
      throw new ForbiddenError(policy.forbiddenMessage ?? 'Not authorized')
    }
  }
}
