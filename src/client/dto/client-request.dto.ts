import { IsString, IsNotEmpty } from 'class-validator'

export class CreateClientRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  contactInfo: string
}
