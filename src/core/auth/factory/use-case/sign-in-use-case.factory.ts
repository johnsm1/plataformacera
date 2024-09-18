import { SignInUseCase } from '@/core/auth/use-case/sign-in.use-case'
import { UserRepository } from '@/infra/database/mongodb/repository'

export function makeSignInUseCase(): SignInUseCase {
  const userRepository: UserRepository = new UserRepository()

  return new SignInUseCase(userRepository)
}
