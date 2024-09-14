import * as bcrypt from 'bcrypt'

import { UseCase } from '@/common/usecase/use-case.interface'
import { SignUpRequestDto } from '@/auth/dto'
import { RoleRepository } from '@/infra/database/repository/role.repository'
import { UserRepository } from '@/infra/database/repository/user.repository'
import { User } from '@/user/entity/user.entity'

export class SignUpUseCase implements UseCase<SignUpRequestDto, User> {
  constructor(
    private roleRepository: RoleRepository,
    private userRepository: UserRepository
  ) {
    this.roleRepository = roleRepository
    this.userRepository = userRepository
  }

  async execute(input: SignUpRequestDto): Promise<User> {
    const { name, email, password } = input

    const saltOrRounds = 10
    const hash = await bcrypt.hash(password, saltOrRounds)

    const newUser: User = {
      name,
      email,
      password: hash,
      roles: await this.roleRepository.findAllByName(['ADMIN']),
    }

    return await this.userRepository.save(newUser)
  }
}
