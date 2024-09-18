import JwtService from '@/auth/services/jwt-service'

export function makeJwtService(): JwtService {
  return new JwtService()
}
