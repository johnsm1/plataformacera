import { Role } from '@/auth/entity/role.entity'

export interface User {
  id?: string
  name: string
  email: string
  password: string
  roles: Role[]
}
