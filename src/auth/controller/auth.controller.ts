import { type Request, type Response } from 'express'
import { validate } from 'class-validator'

import { HttpException } from '@/common/exception/http-exception.error'
import {
  RefreshTokenUseCase,
  SignInUseCase,
  SignUpUseCase,
} from '@/auth/use-case'
import { plainToClass } from 'class-transformer'
import { returnMessageErrors } from '@/common/helper/error-message-map'
import { SignInRequestDto, SignUpRequestDto, SignUpResponseDto } from '../dto'

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
    const errors = await validate(signInRequestDto)
    const messages = returnMessageErrors(errors)

    if (messages) {
      throw new HttpException(messages, 400)
    }
    const response = await this.signInUseCase.execute(signInRequestDto)
    return res.json(response)
  }

  async signUp(req: Request, res: Response) {
    const signUpRequestDto = plainToClass(SignUpRequestDto, req.body)
    const errors = await validate(signUpRequestDto)
    const messages = returnMessageErrors(errors)

    if (messages) {
      throw new HttpException(messages, 400)
    }

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
