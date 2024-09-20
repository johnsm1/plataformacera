import { SignInUseCase } from '@/core/auth/use-case/sign-in.use-case'
import {
  RoleRepository,
  UserRepository,
} from '@/infra/database/mongodb/repository'

export function makeSignInUseCase(): SignInUseCase {
  const userRepository: UserRepository = new UserRepository()
  const roleRepository: RoleRepository = new RoleRepository()

  return new SignInUseCase(userRepository, roleRepository)
}
