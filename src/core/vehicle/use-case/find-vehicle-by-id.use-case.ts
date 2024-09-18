import { VehicleRepository } from '@/infra/database/mongodb/repository'
import { IVehicle } from '@/core/vehicle/entity'

export class FindVehicleByIdUseCase {
  public constructor(private vehicleRepository: VehicleRepository) {
    this.vehicleRepository = vehicleRepository
  }

  public async execute(vehicleId: string): Promise<IVehicle | undefined> {
    return await this.vehicleRepository.findById(vehicleId)
  }
}
