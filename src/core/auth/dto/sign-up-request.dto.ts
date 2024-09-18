import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignUpRequestDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  role: string

  constructor(name: string, email: string, password: string, role: string) {
    this.name = name
    this.email = email
    this.password = password
    this.role = role
  }
}
