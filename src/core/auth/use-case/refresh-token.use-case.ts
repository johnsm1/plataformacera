import { UseCase } from '@/common/usecase/use-case.interface'
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto'
import { JwtPayloadDto } from '@/core/auth/dto'
import { HttpException } from '@/common/exception/http-exception.error'
import { IUser } from '@/core/user/entity/user.entity'
import {
  RoleRepository,
  UserRepository,
} from '@/infra/database/mongodb/repository'
import { makeJwtService } from '../factory/service/jwt-service-factory'

export class RefreshTokenUseCase
  implements UseCase<string, RefreshTokenResponseDto>
{
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository
  ) {
    this.userRepository = userRepository
    this.roleRepository = roleRepository
  }
  async execute(input: string): Promise<RefreshTokenResponseDto> {
    const refreshToken = input
    const JwtService = makeJwtService()
    const verifyRefreshToken: JwtPayloadDto =
      JwtService.verifyRefreshToken(refreshToken)

    if (!verifyRefreshToken) {
      throw new HttpException('Invalid or expired refresh token', 401)
    }
    const user: IUser = await this.userRepository.findById(
      verifyRefreshToken.userId
    )
    if (!user) {
      throw new HttpException('User not found', 404)
    }
    const role = await this.roleRepository.findById(user.roles.toString())
    const accessToken = JwtService.generateAccessToken(user, role.name)
    const newRefreshToken = JwtService.generateRefreshToken(user.id)

    return new RefreshTokenResponseDto(accessToken, newRefreshToken, 120)
  }
}
