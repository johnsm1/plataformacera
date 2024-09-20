export class SignInResponseDto {
  accessToken: string
  refreshToken: string
  expiresIn: number
  roles: string

  constructor(
    accessToken: string,
    refreshToken: string,
    expireIn: number,
    roles: string
  ) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expiresIn = expireIn
    this.roles = roles
  }
}
