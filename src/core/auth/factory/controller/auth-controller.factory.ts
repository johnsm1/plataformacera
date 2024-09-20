import { AuthController } from '@/core/auth/controller/auth.controller'
import {
  RefreshTokenUseCase,
  SignInUseCase,
  SignUpUseCase,
} from '../../use-case'
import {
  makeRefreshToken,
  makeSignInUseCase,
  makeSignUpUseCase,
} from '../use-case'

export function makeAuthController(): AuthController {
  const signUpUseCase: SignUpUseCase = makeSignUpUseCase()
  const signInUseCase: SignInUseCase = makeSignInUseCase()
  const refreshTokenUseCase: RefreshTokenUseCase = makeRefreshToken()

  return new AuthController(signUpUseCase, signInUseCase, refreshTokenUseCase)
}
