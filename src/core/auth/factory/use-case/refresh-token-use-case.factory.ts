import { RefreshTokenUseCase } from '@/core/auth/use-case'
import { UserRepository } from '@/infra/database/mongodb/repository'

export function makeRefreshToken(): RefreshTokenUseCase {
  const userRepository: UserRepository = new UserRepository()

  return new RefreshTokenUseCase(userRepository)
}
