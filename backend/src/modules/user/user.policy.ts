import { prisma } from '../../db/prisma'
import type { AuthorizePolicy } from '../../middleware/authorize'
import type { CurrentUser } from '../../types/current-user'
import type { UserIdParams } from './user.schemas'

const isSelfOrAdmin = (user: CurrentUser, resource: { id: string }) =>
  user.role === 'ADMIN' || resource.id === user.id

export const userSelfOrAdminPolicy: AuthorizePolicy<{ id: string }> = {
  getResource: (request) => {
    const { id } = request.params as UserIdParams
    return prisma.user.findUnique({ where: { id }, select: { id: true } })
  },
  isAllowed: isSelfOrAdmin,
  notFoundMessage: 'User not found',
  forbiddenMessage: 'You can only access your own account',
}
