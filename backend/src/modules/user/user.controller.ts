import type { FastifyReply, FastifyRequest } from "fastify"
import { userService } from "./user.service"
import type { CreateUserBody } from "./user.schemas"

const createUser = async (
    request: FastifyRequest<{ Body: CreateUserBody }>,
    reply: FastifyReply
) => {
    const result = await userService.createUser(request.body)
    reply.code(201).send(result)
}

export const userController = {
    createUser
}