import * as bcrypt from 'bcrypt'

import { SignInRequestDto } from '../dto/sign-in-request.dto'
import { User } from '@/user/entity/user.entity'
import { UserRepository } from '@/infra/database/repository/user.repository'
import { HttpException } from '@/common/exception/http-exception.error'
import { makeJwtService } from '@/auth/factory/service/jwt-service-factory'
import { UseCase } from '@/common/usecase/use-case.interface'
import { SignInResponseDto } from '../dto/sign-in-response.dto'

export class SignInUseCase
  implements UseCase<SignInRequestDto, SignInResponseDto>
{
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(input: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = input

    const user: User = await this.userRepository.findOneByEmail(email)
    if (!user) {
      throw new HttpException('User not found', 404)
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new HttpException(
        'Unauthorized',
        401,
        'Invalid credentials. Please check your username and password.'
      )
    }
    const JwtService = makeJwtService()
    const accessToken = JwtService.generateAccessToken(user)
    const refreshToken = JwtService.generateRefreshToken(user.id)
    const expireIn = '1m'
    const signInResponseDto = new SignInResponseDto(
      accessToken,
      refreshToken,
      expireIn,
      user.roles
    )

    return signInResponseDto
  }
}
