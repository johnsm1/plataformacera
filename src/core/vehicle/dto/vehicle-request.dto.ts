import { IsNotEmpty, IsString } from 'class-validator'

export class VehicleRequestDTO {
  @IsString()
  @IsNotEmpty()
  numberPlate: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsString()
  @IsNotEmpty()
  year: string
}
