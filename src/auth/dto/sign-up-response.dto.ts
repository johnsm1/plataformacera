import { Role } from '../entity/role.entity'

export class SignUpResponseDto {
  id: string
  name: string
  email: string
  password: string
  role: Role[]

  constructor(name: string, email: string, role: Role[], id: string) {
    this.name = name
    this.email = email
    this.role = role
    this.id = id
  }
}
