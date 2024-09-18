import { IVehicle } from '@/core/vehicle/entity/vehicle.entity'
import { VehicleModel } from '@/infra/database/mongodb/model'
import { Repository } from '@/common/repository'
import { Model } from 'mongoose'
import { mapObjectId } from '@/infra/database/mongodb/helper'
import { logger } from '@/config/logger'

export class VehicleRepository implements Repository<IVehicle> {
  private model: Model<IVehicle>

  constructor() {
    this.model = VehicleModel
  }

  async findById(id: string): Promise<IVehicle | undefined> {
    try {
      const document = await this.model.findById(id)
      return mapObjectId(document.toObject())
    } catch (error) {
      logger.error(error.message)
      return undefined
    }
  }

  async save(entity: IVehicle): Promise<IVehicle> {
    try {
      const document = await this.model.create(entity)
      return mapObjectId(document.toObject())
    } catch (error) {
      logger.error(error)
    }
  }
}
