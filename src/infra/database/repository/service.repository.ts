import { Repository } from '@/common/repository'
import { IService } from '@/service/entity/service.entity'
import { Model } from 'mongoose'
import { mapObjectId } from '../helper'
import { ServiceModel } from '../model/service.model'

export class ServiceRepository implements Repository<IService> {
  private model: Model<IService>

  constructor() {
    this.model = ServiceModel
  }
  async findById(id: string): Promise<IService> {
    return await this.model.findById(id)
  }

  async save(entity: IService): Promise<IService> {
    const document = await this.model.create(entity)

    return mapObjectId(document.toObject())
  }
}
