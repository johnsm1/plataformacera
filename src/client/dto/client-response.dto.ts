import { IsString, IsNotEmpty } from 'class-validator'

export class ClientResponseDTO {
  id?: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  contactInfo: string
}
