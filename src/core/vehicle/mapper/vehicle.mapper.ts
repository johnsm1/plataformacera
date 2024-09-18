import { IVehicle } from '@/core/vehicle/entity'
import { SaveVehicleInputDto } from '@/core/vehicle/dto'

export class VehicleMapper {
  public static mapToEntity(dto: SaveVehicleInputDto): IVehicle {
    const { model, numberPlate, year } = dto

    const entity: IVehicle = {
      model,
      numberPlate,
      year,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    return entity
  }
}
