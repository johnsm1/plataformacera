import { Repository } from '@/common/repository'
import { Model, Types } from 'mongoose'
import { ServiceModel } from '@/infra/database/mongodb/model'
import { PaginationOptionDto } from '@/common/dto/option-pagination.dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import { IService } from '@/core/service/entity/service.entity'
import { mapObjectId } from '@/infra/database/mongodb/helper'
import { logger } from '@/config/logger'
import { ServiceFindByCriteriaDto, UpdateServiceDto } from '@/core/service/dto'

export class ServiceRepository implements Repository<IService> {
  model: Model<IService>

  constructor() {
    this.model = ServiceModel
  }
  async delete(id: Types.ObjectId): Promise<IService | null> {
    return await this.model.findByIdAndDelete(id)
  }

  async findByIdAndUpdate(
    id: Types.ObjectId,
    dto: UpdateServiceDto
  ): Promise<IService> | null {
    const updatedDocument = await this.model.findByIdAndUpdate(id, dto, {
      new: true,
    })

    if (!updatedDocument) {
      return null
    }

    return updatedDocument as IService // Fazendo o cast para IService
  }

  async findById(id: string): Promise<IService> {
    return await this.model.findById(id)
  }
  async findAll(
    filter: Partial<IService>,
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    const { limit, page } = options
    const pageNumber = Math.max(1, Number(page) || 1)
    const pageSize = Math.max(1, Number(limit) || 10)
    const skip = (pageNumber - 1) * pageSize

    const [items, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(pageSize).exec(),
      this.model.countDocuments(filter).exec(),
    ])

    const filteredFields = Object.keys(filter)
    const availableFilters = ServiceFindByCriteriaDto.getFields()

    return {
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
      total,
      availableFilters,
      filteredFields,
      items,
    }
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
