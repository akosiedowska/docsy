import * as bcrypt from 'bcrypt'

import { prisma } from '../../db/prisma'
import { UnauthorizedError } from '../../errors/http-error'

const validateCredentials = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)

  if (!passwordMatches) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const { passwordHash, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const authService = {
  validateCredentials,
}
