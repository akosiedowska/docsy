import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { authRoutes } from '../modules/auth/auth.routes'
import { userRoutes } from '../modules/user/user.routes'
import { doctorRoutes } from '../modules/doctor/doctor.routes'

export const routes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.register(userRoutes)
  fastify.register(authRoutes)
  fastify.register(doctorRoutes)
}
