import { Role } from '../entity/role.entity'

export class SignInResponseDto {
  accessToken: string
  refreshToken: string
  expiresIn: string
  roles: Role[]

  constructor(
    accessToken: string,
    refreshToken: string,
    expireIn: string,
    roles: Role[]
  ) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresIn = expireIn
    this.roles = roles
  }
}
