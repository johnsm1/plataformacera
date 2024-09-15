import { SignInUseCase } from '@/auth/use-case/sign-in.use-case'
import { UserRepository } from '@/infra/database/repository/user.repository'

export function makeSignInUseCase(): SignInUseCase {
  const userRepository: UserRepository = new UserRepository()

  return new SignInUseCase(userRepository)
}
