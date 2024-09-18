import { SignUpUseCase } from '@/core/auth/use-case'
import {
  RoleRepository,
  UserRepository,
} from '@/infra/database/mongodb/repository'

export function makeSignUpUseCase(): SignUpUseCase {
  const roleRepository: RoleRepository = new RoleRepository()
  const userRepository: UserRepository = new UserRepository()

  return new SignUpUseCase(roleRepository, userRepository)
}
