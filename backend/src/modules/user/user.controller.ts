import type { FastifyReply, FastifyRequest } from 'fastify'

import { userService } from './user.service'
import type { CreateUserBody, UpdateUserBody, UserIdParams } from './user.schemas'

const createUser = async (request: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) => {
  const result = await userService.createUser(request.body)
  reply.code(201).send(result)
}

const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await userService.getAllUsers()
  reply.code(200).send(result)
}

const getUserById = async (request: FastifyRequest<{ Params: UserIdParams }>, reply: FastifyReply) => {
  const result = await userService.getUserById(request.params.id)
  reply.code(200).send(result)
}

const updateUserById = async (
  request: FastifyRequest<{ Params: UserIdParams; Body: UpdateUserBody }>,
  reply: FastifyReply,
) => {
  const result = await userService.updateUserById(request.params.id, request.body)
  reply.code(200).send(result)
}

const deleteUserById = async (request: FastifyRequest<{ Params: UserIdParams }>, reply: FastifyReply) => {
  await userService.deleteUserById(request.params.id)
  reply.code(204).send()
}

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
}
