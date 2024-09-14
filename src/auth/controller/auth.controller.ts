import type { Request, Response } from 'express'
import { validate } from 'class-validator'

import { SignUpRequestDto } from '@/auth/dto/sign-up-request.dto'
import { HttpException } from '@/common/exception/http-exception.error'
import { SignUpUseCase } from '@/auth/use-case'

export class AuthController {
  constructor(private signUpUseCase: SignUpUseCase) {
    this.signUpUseCase = signUpUseCase
  }

  async signUp(req: Request, res: Response) {
    const signUpRequestDto = new SignUpRequestDto(
      req.body.name,
      req.body.email,
      req.body.password
    )

    const errors = await validate(signUpRequestDto)

    if (errors.length > 0) {
      const messages = errors.map((error) =>
        Object.values(error.constraints!).join(', ')
      )

      throw new HttpException(messages, 400)
    }

    const user = await this.signUpUseCase.execute(signUpRequestDto)

    return res.json(user)
  }
}
