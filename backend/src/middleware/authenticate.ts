import type { FastifyReply, FastifyRequest } from 'fastify'

import { prisma } from '../db/prisma'
import { UnauthorizedError } from '../errors/http-error'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()
  const { sub } = request.user as { sub: string }

  const user = await prisma.user.findUnique({
    where: { id: sub },
    select: { id: true, email: true, role: true },
  })
  if (!user) throw new UnauthorizedError('User not found')

  request.currentUser = user
}
