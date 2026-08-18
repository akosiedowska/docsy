import type { FastifyReply, FastifyRequest } from 'fastify'

import { userService } from '../user/user.service'
import { authService } from './auth.service'
import type { LoginBody } from './auth.schemas'

const login = async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
  const user = await authService.validateCredentials(request.body.email, request.body.password)
  const accessToken = await reply.jwtSign({ sub: user.id }, { expiresIn: '15m' })
  reply.code(200).send({ accessToken, user })
}

const me = async (request: FastifyRequest, reply: FastifyReply) => {
  const { sub } = request.user as { sub: string }
  const user = await userService.getUserById(sub)
  reply.code(200).send(user)
}

export const authController = {
  login,
  me,
}
