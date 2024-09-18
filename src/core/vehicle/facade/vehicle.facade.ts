import { VehicleRepository } from '@/infra/database/mongodb/repository'
import { FindVehicleByIdUseCase } from '@/core/vehicle/use-case'
import { IVehicle } from '@/core/vehicle/entity'

export class VehicleFacade {
  private findVehicleByIdUseCase: FindVehicleByIdUseCase

  public constructor() {
    const vehicleRepository = new VehicleRepository()

    this.findVehicleByIdUseCase = new FindVehicleByIdUseCase(vehicleRepository)
  }

  public async findById(id: string): Promise<IVehicle> {
    return await this.findVehicleByIdUseCase.execute(id)
  }
}
