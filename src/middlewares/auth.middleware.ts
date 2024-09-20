import { HttpException } from '@/common/exception/http-exception.error'
import { roles } from '@/core/auth/enum/role.enum'
import JwtService from '@/core/auth/services/jwt-service'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authMiddleware = (allowedRoles: roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return new HttpException('Token not provided', 401)
    }

    const jwtService = new JwtService()

    const JwtPayload: jwt.JwtPayload = jwtService.verifyToken(token)
    const role = JwtPayload.role

    if (!allowedRoles.includes(role)) {
      return new HttpException('Access denied', 403)
    }

    next()
  }
}

export default authMiddleware
