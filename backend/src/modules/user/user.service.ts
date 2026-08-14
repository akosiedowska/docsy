import { prisma } from '../../db/prisma'
import * as bcrypt from 'bcrypt'
import { ConflictError } from '../../errors/http-error'
import type { CreateUserBody } from './user.schemas'

const createUser = async (userData: CreateUserBody) => {
    const userInDb = await prisma.user.findUnique({
        where: { email: userData.email }
    })

    if (userInDb) {
        throw new ConflictError('A user with the provided email already exists')
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12)

    const result = await prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            passwordHash: hashedPassword
        }
    })

    const { passwordHash, ...userWithoutPassword } = result
    return userWithoutPassword
}

export const userService = {
    createUser
}