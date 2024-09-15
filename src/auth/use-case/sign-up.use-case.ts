import * as bcrypt from 'bcrypt'

import { UseCase } from '@/common/usecase/use-case.interface'
import { SignUpRequestDto } from '@/auth/dto'
import { RoleRepository } from '@/infra/database/repository/role.repository'
import { UserRepository } from '@/infra/database/repository/user.repository'
import { IUser } from '@/user/entity/user.entity'
import { HttpException } from '@/common/exception/http-exception.error'
import { SignUpResponseDto } from '../dto/sign-up-response.dto'
import { IRole } from '../entity/role.entity'

export class SignUpUseCase
  implements UseCase<SignUpRequestDto, SignUpResponseDto>
{
  constructor(
    private roleRepository: RoleRepository,
    private userRepository: UserRepository
  ) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
  }

  async execute(input: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { name, email, password } = input

    const saltOrRounds = 1
    const hash = await bcrypt.hash(password, saltOrRounds)
    const roles: IRole[] = await this.roleRepository.findAllByName(['ADMIN'])

    const userExist = await this.userRepository.findOneByEmail(email)
    if (userExist) {
      throw new HttpException('user already exists', 400)
    }

    const newUser: IUser = {
      name,
      email,
      password: hash,
      roles: roles,
    }
    const userSaved = await this.userRepository.save(newUser)
    return new SignUpResponseDto(
      userSaved.name,
      userSaved.email,
      roles,
      userSaved.id
    )
  }
}
