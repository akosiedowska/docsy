import type { FastifyReply, FastifyRequest } from 'fastify'

import { ForbiddenError, NotFoundError } from '../errors/http-error'
import type { CurrentUser } from '../types/current-user'

export interface AuthorizeOptions<T> {
  load: (request: FastifyRequest) => Promise<T | null | undefined>
  check: (user: CurrentUser, resource: T) => boolean
  notFoundMessage?: string
  forbiddenMessage?: string
}

export function authorize<T>({ load, check, notFoundMessage, forbiddenMessage }: AuthorizeOptions<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const resource = await load(request)
    if (!resource) throw new NotFoundError(notFoundMessage ?? 'Resource not found')
    if (!check(request.currentUser, resource)) throw new ForbiddenError(forbiddenMessage ?? 'Not authorized')
  }
}
