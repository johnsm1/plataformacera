// import { AuthController } from '@/auth/controller/auth.controller'
// import {
//   RefreshTokenUseCase,
//   SignInUseCase,
//   SignUpUseCase,
// } from '@/auth/use-case'
// import {
//   makeSignUpUseCase,
//   makeSignInUseCase,
//   makeRefreshToken,
// } from '@/auth/factory/use-case'

import { AuthController } from '../../controller/auth.controller'
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
