import { IRole } from '../entity/role.entity'

export class SignUpResponseDto {
  id: string
  name: string
  email: string
  password: string
  role: IRole[]

  constructor(name: string, email: string, role: IRole[], id: string) {
    this.name = name
    this.email = email
    this.role = role
    this.id = id
  }
}
