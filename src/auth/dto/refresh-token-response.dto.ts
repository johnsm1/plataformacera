export class RefreshTokenResponseDto {
  accessToken: string
  refreshToken: string
  expireIn: number

  constructor(accessToken: string, refreshToken: string, expireIn: number) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.expireIn = expireIn
  }
}
