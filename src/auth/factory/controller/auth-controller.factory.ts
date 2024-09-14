import { AuthController } from '@/auth/controller/auth.controller'
import { SignUpUseCase } from '@/auth/use-case'
import { makeSignUpUseCase } from '@/auth/factory/use-case'

export function makeAuthController(): AuthController {
  const signUpUseCase: SignUpUseCase = makeSignUpUseCase()

  return new AuthController(signUpUseCase)
}
