import { Repository } from '@/common/repository'
import { Model, Types } from 'mongoose'
import { ServiceModel } from '@/infra/database/mongodb/model'
import { PaginationOptionDto } from '@/common/dto/option-pagination.dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import { IService } from '@/core/service/entity/service.entity'
import { mapObjectId } from '@/infra/database/mongodb/helper'
import { logger } from '@/config/logger'

export class ServiceRepository implements Repository<IService> {
  private model: Model<IService>

  constructor() {
    this.model = ServiceModel
  }
  async delete(id: Types.ObjectId): Promise<IService | null> {
    return await this.model.findByIdAndDelete(id)
  }

  async findById(id: string): Promise<IService> {
    return await this.model.findById(id)
  }
  async findBy(
    filter: Partial<IService>,
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    const { limit, page } = options
    const pageNumber = Number(page)
    const skip = (pageNumber - 1) * limit

    const [items, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec(),
    ])
    const filteredFields = Object.keys(filter)

    const result: PaginationResultDto<IService> = {
      page: pageNumber,
      pages: Math.ceil(total / limit),
      total,
      filteredFields,
      items,
    }
    return result
  }

  async findAll(
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    const { limit, page } = options
    const skip = (page - 1) * limit

    const items = await this.model.find().skip(skip).limit(limit).exec()

    const total = await this.model.countDocuments().exec()
    const result: PaginationResultDto<IService> = {
      page,
      pages: Math.ceil(total / limit),
      total,
      items,
    }
    return result
  }

  async save(entity: IService): Promise<IService> {
    try {
      const { vehicle, customer, ...rest } = entity

      const documentFromDb = await this.model.create({
        ...rest,
        vehicle: vehicle.id,
        customer: customer.id,
      })

      const document = await this.model
        .findById(documentFromDb._id)
        .populate(['customer', 'vehicle'])

      return mapObjectId(document.toObject())
    } catch (error) {
      logger.error(error.message)
      throw error
    }
  }
}
