import * as bcrypt from 'bcrypt'

import { prisma } from '../../db/prisma'
import { ConflictError, NotFoundError } from '../../errors/http-error'
import type { CreateUserBody, UpdateUserBody, UserIdParams } from './user.schemas'

const SALT_ROUNDS = 12

const createUser = async (userData: CreateUserBody) => {
  const userInDb = await prisma.user.findUnique({
    where: { email: userData.email },
  })

  if (userInDb) {
    throw new ConflictError('A user with the provided email already exists')
  }

  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS)

  const result = await prisma.user.create({
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      passwordHash: hashedPassword,
    },
  })

  const { passwordHash, ...userWithoutPassword } = result
  return userWithoutPassword
}

const getAllUsers = async () => {
  const result = await prisma.user.findMany({})
  return result
}

const getUserById = async (id: string) => {
  const result = await prisma.user.findFirst({
    where: { id },
  })
  if (!result) throw new NotFoundError('User not found')
  const { passwordHash, ...userWithoutPassword } = result
  return userWithoutPassword
}

const updateUserById = async (id: string, userData: UpdateUserBody) => {
  const userInDb = await prisma.user.findUnique({ where: { id } })

  if (!userInDb) {
    throw new NotFoundError('User not found')
  }

  if (userData.email) {
    const userEmailInDb = await prisma.user.findUnique({
      where: { email: userData.email },
    })

    if (userEmailInDb && userEmailInDb.id !== id) {
      throw new ConflictError('Email already used')
    }
  }

  const hashedPassword = userData.password
    ? await bcrypt.hash(userData.password, 12)
    : undefined

  const result = await prisma.user.update({
    where: { id },
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      passwordHash: hashedPassword,
    },
  })

  const { passwordHash, ...userWithoutPassword } = result
  return userWithoutPassword
}

const deleteUserById = async (id: string) => {
  const userInDb = await prisma.user.findUnique({ where: { id } })

  if (!userInDb) {
    throw new NotFoundError('User not found')
  }

  await prisma.user.delete({ where: { id } })
}

export const userService = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
}
