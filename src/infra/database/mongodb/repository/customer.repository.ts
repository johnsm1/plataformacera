import { Repository } from '@/common/repository'
import { ICustomer } from '@/core/customer/entity'
import { CustomerModel } from '@/infra/database/mongodb/model'
import { Model } from 'mongoose'
import { mapObjectId } from '@/infra/database/mongodb/helper'
import { logger } from '@/config/logger'

export class CustomerRepository implements Repository<ICustomer> {
  private model: Model<ICustomer>

  constructor() {
    this.model = CustomerModel
  }

  async findById(id: string): Promise<ICustomer | undefined> {
    try {
      const document = await this.model.findById(id)
      return mapObjectId(document.toObject())
    } catch (error) {
      logger.error(error.message)
      return undefined
    }
  }

  async save(entity: ICustomer): Promise<ICustomer> {
    try {
      const document = await this.model.create(entity)
      return mapObjectId(document.toObject())
    } catch (error) {
      logger.error(error)
      throw error
    }
  }
}
