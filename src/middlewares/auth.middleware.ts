import { HttpException } from '@/common/exception/http-exception.error'
import { logger } from '@/config/logger'
import { roles } from '@/core/auth/enum/role.enum'
import JwtService from '@/core/auth/services/jwt-service'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (allowedRoles: roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    let JwtPayload: jwt.JwtPayload
    if (!token) {
      throw new HttpException('Unauthorized', 401, 'Token not provided')
    }

    const jwtService = new JwtService()
    try {
      JwtPayload = jwtService.verifyToken(token)
    } catch (error) {
      logger.info(error)
      throw new HttpException('Unauthorized', 401, 'Invalid or expired token')
    }

    const role = JwtPayload.role

    if (!allowedRoles.includes(role)) {
      throw new HttpException('Forbidden', 403, 'Access denied')
    }

    next()
  }
}

export default authMiddleware
