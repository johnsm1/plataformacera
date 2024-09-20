import { roles } from '../enum/role.enum'

export class TokenDto {
  email: string
  roles: roles[]
  expiresIn: number

  constructor(email: string, roles: roles[], expiresIn: number) {
    this.email = email
    this.roles = roles
    this.expiresIn = expiresIn
  }
}
