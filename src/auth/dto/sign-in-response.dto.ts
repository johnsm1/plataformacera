import { IRole } from '../entity/role.entity'

export class SignInResponseDto {
  accessToken: string
  refreshToken: string
  expiresIn: string
  roles: IRole[]

  constructor(
    accessToken: string,
    refreshToken: string,
    expireIn: string,
    roles: IRole[]
  ) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresIn = expireIn
    this.roles = roles
  }
}
