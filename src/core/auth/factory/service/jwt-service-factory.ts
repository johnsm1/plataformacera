import JwtService from '@/core/auth/services/jwt-service'

export function makeJwtService(): JwtService {
  return new JwtService()
}
