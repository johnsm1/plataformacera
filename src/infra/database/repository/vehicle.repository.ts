import { IVehicle } from '@/vehicle/entity/vehicle.entity'
import { VehicleModel } from '../model/vehicle.model'
import { Repository } from '@/common/repository'
import { Model } from 'mongoose'
import { mapObjectId } from '../helper'

export class VehicleRepository implements Repository<IVehicle> {
  private model: Model<IVehicle>

  constructor() {
    this.model = VehicleModel
  }
  async findById(id: string): Promise<IVehicle> {
    return await this.model.findById(id)
  }

  async save(entity: IVehicle): Promise<IVehicle> {
    const document = await this.model.create(entity)

    return mapObjectId(document.toObject())
  }
}
