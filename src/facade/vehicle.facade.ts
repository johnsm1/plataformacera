import { VehicleRepository } from '@/infra/database/repository'
import { IVehicle } from '@/core/vehicle/entity/vehicle.entity'

class VehicleFacade {
  private vehicleRepository: VehicleRepository

  constructor() {
    this.vehicleRepository = new VehicleRepository()
  }

  public static makeVehicleFacade(): VehicleFacade {
    return new VehicleFacade()
  }

  public async save(vehicle: IVehicle): Promise<IVehicle> {
    return await this.vehicleRepository.save(vehicle)
  }

  public async getVehicleFacade(id: string): Promise<IVehicle> {
    return await this.vehicleRepository.findById(id)
  }
}

export default VehicleFacade
