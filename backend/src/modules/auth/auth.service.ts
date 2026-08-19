import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

import { prisma } from '../../db/prisma'
import { UnauthorizedError } from '../../errors/http-error'
import { REFRESH_TOKEN_TTL_MS, REFRESH_TOKEN_GRACE_MS } from './auth.constants'

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

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
      userAgent: meta.userAgent,
      ip: meta.ip,
    },
  })

  return { token }
}

const rotateSession = async (rawToken: string, meta: SessionMeta) => {
  const hash = hashToken(rawToken)

  return prisma.$transaction(async (tx) => {
    const session = await tx.session.findFirst({
      where: { OR: [{ tokenHash: hash }, { prevTokenHash: hash }] },
    })

    if (!session) {
      throw new UnauthorizedError('Invalid refresh token')
    }

    if (session.revokedAt) {
      throw new UnauthorizedError('Session revoked')
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedError('Session expired')
    }

    const matchedCurrent = hash === session.tokenHash
    const matchedPrevInGrace =
      hash === session.prevTokenHash &&
      session.rotatedAt !== null &&
      Date.now() - session.rotatedAt.getTime() <= REFRESH_TOKEN_GRACE_MS

    if (!matchedCurrent && !matchedPrevInGrace) {
      await tx.session.update({
        where: { id: session.id },
        data: { revokedAt: new Date() },
      })
      throw new UnauthorizedError('Refresh token reuse detected')
    }

    const newToken = generateRefreshToken()
    const now = new Date()

    await tx.session.update({
      where: { id: session.id },
      data: {
        tokenHash: hashToken(newToken),
        prevTokenHash: session.tokenHash,
        rotatedAt: now,
        expiresAt: new Date(now.getTime() + REFRESH_TOKEN_TTL_MS),
        userAgent: meta.userAgent,
        ip: meta.ip,
      },
    })

    return { token: newToken, userId: session.userId }
  })
}

const revokeSessionByToken = async (rawToken: string) => {
  const hash = hashToken(rawToken)

  await prisma.session.updateMany({
    where: { OR: [{ tokenHash: hash }, { prevTokenHash: hash }], revokedAt: null },
    data: { revokedAt: new Date() },
  })
}

export const authService = {
  validateCredentials,
  createSession,
  rotateSession,
  revokeSessionByToken,
}
