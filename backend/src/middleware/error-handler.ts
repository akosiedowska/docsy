import type { FastifyError, FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { HttpError } from '../errors/http-error'

export function registerErrorHandler(fastify: FastifyInstance) {
    fastify.setErrorHandler((error: FastifyError, request, reply) => {
        if (hasZodFastifySchemaValidationErrors(error)) {
            return reply.code(400).send({
                message: 'Validation failed',
                issues: error.validation
            })
        }

        if (error instanceof HttpError) {
            return reply.code(error.statusCode).send({ message: error.message })
        }

        if (typeof error.statusCode === 'number' && error.statusCode >= 400 && error.statusCode < 500) {
            return reply.code(error.statusCode).send({ message: error.message })
        }

        fastify.log.error(error)
        return reply.code(500).send({ message: 'Internal server error' })
    })
}
