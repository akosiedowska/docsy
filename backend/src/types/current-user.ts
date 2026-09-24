import type { Role } from '../../generated/prisma/client'

export interface CurrentUser {
  id: string
  email: string
  role: Role
}
