import { IsNotEmpty } from 'class-validator'

export class VehicleDto {
  id?: string
  numberPlate: string
  model: string
  year: number
}

export class SaveVehicleInputDto {
  @IsNotEmpty()
  numberPlate: string

  @IsNotEmpty()
  model: string

  @IsNotEmpty()
  year: number

  constructor(numberPlate: string, model: string, year: number) {
    this.numberPlate = numberPlate
    this.model = model
    this.year = year
  }
}

export class SaveVehicleOutputDto {
  id: string
  numberPlate: string
  model: string
  year: number
}
