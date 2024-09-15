import { logger } from '@/config/logger'
import { IUser } from '@/user/entity/user.entity'
import { JwtPayload, sign, verify } from 'jsonwebtoken'

class JwtService {
  private JWT_SECRET: string
  private JWT_REFRESH_SECRET: string

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'teste'
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'teste'
  }

  public generateAccessToken(user: IUser): string {
    const { email, roles } = user
    return sign({ email, roles }, this.JWT_SECRET, { expiresIn: 30 })
  }

  public generateRefreshToken(userId: string): string {
    return sign({ userId }, this.JWT_REFRESH_SECRET, { expiresIn: 120 })
  }

  public verifyToken(token: string): JwtPayload {
    return verify(token, this.JWT_SECRET) as JwtPayload
  }

  public verifyRefreshToken(refreshToken: string): JwtPayload | null {
    try {
      return verify(refreshToken, this.JWT_REFRESH_SECRET) as JwtPayload
    } catch (error) {
      logger.error(error)
      return null
    }
  }
}

export default JwtService
