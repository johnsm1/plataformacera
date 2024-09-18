import { VehicleRepository } from '@/infra/database/mongodb/repository'
import { SaveVehicleInputDto } from '@/core/vehicle/dto'
import { VehicleMapper } from '@/core/vehicle/mapper'

export class SaveVehicleUseCase {
  public constructor(private vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }

  public async execute(input: SaveVehicleInputDto) {
    return await this.vehicleRepository.save(VehicleMapper.mapToEntity(input))
  }
}
