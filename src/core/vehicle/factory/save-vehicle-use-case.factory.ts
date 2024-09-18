import { VehicleRepository } from '@/infra/database/mongodb/repository'
import { SaveVehicleUseCase } from '@/core/vehicle/use-case'

export class SaveVehicleUseCaseFactory {
  public static create(): SaveVehicleUseCase {
    const vehicleRepository = new VehicleRepository()

    return new SaveVehicleUseCase(vehicleRepository)
  }
}
