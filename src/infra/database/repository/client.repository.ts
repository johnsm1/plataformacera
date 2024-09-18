import { IClient } from '@/core/client/entity/client.entity'
import { Repository } from '@/common/repository'
import { Model } from 'mongoose'
import { ClientModel } from '../model/client.model'

export class ClientRepository implements Repository<IClient> {
  private model: Model<IClient>

  constructor() {
    this.model = ClientModel
  }
  async findById(id: string): Promise<IClient> {
    return await this.model.findById(id)
  }

  async save(entity: IClient): Promise<IClient> {
    return await this.model.create(entity)
  }
}
