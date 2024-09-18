import * as bcrypt from 'bcrypt'

import { SignInRequestDto } from '../dto/sign-in-request.dto'
import { IUser } from '@/core/user/entity/user.entity'
import { HttpException } from '@/common/exception/http-exception.error'
import { UseCase } from '@/common/usecase/use-case.interface'
import { SignInResponseDto } from '../dto/sign-in-response.dto'
import { UserRepository } from '@/infra/database/mongodb/repository'
import { makeJwtService } from '../factory/service/jwt-service-factory'

export class SignInUseCase
  implements UseCase<SignInRequestDto, SignInResponseDto>
{
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(input: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = input

    const user: IUser = await this.userRepository.findOneByEmail(email)
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
    console.log(signInResponseDto)
    return signInResponseDto
  }
}
