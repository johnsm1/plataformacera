import { logger } from '@/config/logger'
import { IUser } from '@/core/user/entity/user.entity'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import config from '@/config/env-config' // Ajuste o caminho conforme necessário

class JwtService {
  private readonly JWT_SECRET: string
  private readonly JWT_REFRESH_SECRET: string
  private readonly ACCESS_TOKEN_EXPIRY: number
  private readonly REFRESH_TOKEN_EXPIRY: number

  constructor() {
    this.JWT_SECRET = config.JWT_SECRET
    this.JWT_REFRESH_SECRET = config.JWT_REFRESH_SECRET
    this.ACCESS_TOKEN_EXPIRY = config.ACCESS_TOKEN_EXPIRY
    this.REFRESH_TOKEN_EXPIRY = config.REFRESH_TOKEN_EXPIRY
  }

  public generateAccessToken(user: IUser): string {
    const { email, roles } = user
    return sign({ email, roles }, this.JWT_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    })
  }

  public generateRefreshToken(userId: string): string {
    return sign({ userId }, this.JWT_REFRESH_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    })
  }

  public verifyToken(token: string): JwtPayload {
    try {
      return verify(token, this.JWT_SECRET) as JwtPayload
    } catch (error) {
      logger.error('Invalid access token:', error)
      throw new Error('Invalid access token')
    }
  }

  public verifyRefreshToken(refreshToken: string): JwtPayload | null {
    try {
      return verify(refreshToken, this.JWT_REFRESH_SECRET) as JwtPayload
    } catch (error) {
      logger.error('Invalid refresh token:', error)
      return null
    }
  }
}

export default JwtService
