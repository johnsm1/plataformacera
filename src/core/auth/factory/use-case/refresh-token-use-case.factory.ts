import { RefreshTokenUseCase } from '@/core/auth/use-case'
import {
  RoleRepository,
  UserRepository,
} from '@/infra/database/mongodb/repository'

export function makeRefreshToken(): RefreshTokenUseCase {
  const userRepository: UserRepository = new UserRepository()
  const roleRepository: RoleRepository = new RoleRepository()
  return new RefreshTokenUseCase(userRepository, roleRepository)
}
