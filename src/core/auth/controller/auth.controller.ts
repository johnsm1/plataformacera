import { type Request, type Response } from 'express'

import {
  RefreshTokenUseCase,
  SignInUseCase,
  SignUpUseCase,
} from '@/core/auth/use-case'
import { plainToClass } from 'class-transformer'
import { SignInRequestDto, SignUpRequestDto, SignUpResponseDto } from '../dto'
import { validateDto } from '@/common/validator/validate-error'

export class AuthController {
  constructor(
    private signUpUseCase: SignUpUseCase,
    private signInUseCase: SignInUseCase,
    private refreshTokenUseCase: RefreshTokenUseCase
  ) {
    this.signUpUseCase = signUpUseCase
    this.signInUseCase = signInUseCase
    this.refreshTokenUseCase = refreshTokenUseCase
  }

  async signIn(req: Request, res: Response) {
    const signInRequestDto = new SignInRequestDto(
      req.body.email,
      req.body.password
    )
    await validateDto(signInRequestDto)
    const response = await this.signInUseCase.execute(signInRequestDto)
    return res.json(response)
  }

  async signUp(req: Request, res: Response) {
    const signUpRequestDto = plainToClass(SignUpRequestDto, req.body)
    await validateDto(signUpRequestDto)

    const signUpResponseDto: SignUpResponseDto =
      await this.signUpUseCase.execute(signUpRequestDto)
    return res.json(signUpResponseDto)
  }

  async refreshToken(req: Request, res: Response) {
    const authHeader = req.headers['authorization']
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null
    return res.json(await this.refreshTokenUseCase.execute(token))
  }
}
