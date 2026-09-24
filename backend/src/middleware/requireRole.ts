import type { FastifyReply, FastifyRequest } from 'fastify'

import { ForbiddenError } from '../errors/http-error'
import type { Role } from '../../generated/prisma/client'

export function requireRole(...roles: Role[]) {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    if (!roles.includes(request.currentUser.role)) {
      throw new ForbiddenError('Not authorized')
    }
  }
}
