import { RefreshTokenUseCase } from '@/auth/use-case'
import { UserRepository } from '@/infra/database/repository/user.repository'

export function makeRefreshToken(): RefreshTokenUseCase {
  const userRepository: UserRepository = new UserRepository()

  return new RefreshTokenUseCase(userRepository)
}
