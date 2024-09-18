import { IVehicle } from '@/core/vehicle/entity/vehicle.entity'
import { VehicleModel } from '../model/vehicle.model'
import { Repository } from '@/common/repository'
import { Model } from 'mongoose'

export class VehicleRepository implements Repository<IVehicle> {
  private model: Model<IVehicle>

  constructor() {
    this.model = VehicleModel
  }
  async findById(id: string): Promise<IVehicle> {
    return await this.model.findById(id)
  }

  async save(entity: IVehicle): Promise<IVehicle> {
    return await this.model.create(entity)
  }
}
