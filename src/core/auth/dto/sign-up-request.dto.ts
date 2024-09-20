import { IsEmail, IsNotEmpty } from 'class-validator'
import { roles } from '../enum/role.enum'

export class SignUpRequestDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  role: roles

  constructor(name: string, email: string, password: string, role: roles) {
    this.name = name
    this.email = email
    this.password = password
    this.role = role
  }
}
