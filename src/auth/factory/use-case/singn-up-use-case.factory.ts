import { SignUpUseCase } from '@/auth/use-case'
import { RoleRepository } from '@/infra/database/repository/role.repository'
import { UserRepository } from '@/infra/database/repository/user.repository'

export function makeSignUpUseCase(): SignUpUseCase {
  const roleRepository: RoleRepository = new RoleRepository()
  const userRepository: UserRepository = new UserRepository()

  return new SignUpUseCase(roleRepository, userRepository)
}
