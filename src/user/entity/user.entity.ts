import { Role } from '@/auth/entity/role.entity'

export interface User {
  name: string
  email: string
  password: string
  roles: Role[]
}
