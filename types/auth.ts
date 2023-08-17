import { User } from '@prisma/client'

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}
