import { IRole } from '@/auth/entity/role.entity'

export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  roles: IRole[]
}
