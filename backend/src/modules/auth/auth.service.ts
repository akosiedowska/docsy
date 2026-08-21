import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

import { prisma } from '../../db/prisma'
import { UnauthorizedError } from '../../errors/http-error'
import { REFRESH_TOKEN_TTL_MS } from './auth.constants'

type SessionMeta = { userAgent?: string; ip?: string }

const generateRefreshToken = () => crypto.randomBytes(32).toString('hex')
const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex')

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

const createSession = async (userId: string, meta: SessionMeta) => {
  const token = generateRefreshToken()
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS)

  await prisma.session.upsert({
    where: { userId },
    create: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      userAgent: meta.userAgent,
      ip: meta.ip,
    },
    update: {
      tokenHash: hashToken(token),
      expiresAt,
      userAgent: meta.userAgent,
      ip: meta.ip,
    },
  })

  return { token }
}

const verifySession = async (rawToken: string) => {
  const hash = hashToken(rawToken)
  const session = await prisma.session.findUnique({ where: { tokenHash: hash } })

  if (!session) {
    throw new UnauthorizedError('Invalid refresh token')
  }

  if (session.expiresAt < new Date()) {
    throw new UnauthorizedError('Session expired')
  }

  return { userId: session.userId }
}

const revokeSessionByToken = async (rawToken: string) => {
  const hash = hashToken(rawToken)

  await prisma.session.deleteMany({ where: { tokenHash: hash } })
}

export const authService = {
  validateCredentials,
  createSession,
  verifySession,
  revokeSessionByToken,
}
