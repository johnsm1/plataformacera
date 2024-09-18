import { VehicleRepository } from '@/infra/database/mongodb/repository'
import { FindVehicleByIdUseCase } from '@/core/vehicle/use-case'

export class FindVehicleByIdUseCaseFactory {
  public static create(): FindVehicleByIdUseCase {
    const vehicleRepository = new VehicleRepository()

    return new FindVehicleByIdUseCase(vehicleRepository)
  }
}
