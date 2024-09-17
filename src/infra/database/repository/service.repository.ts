import { Repository } from '@/common/repository'
import { IService } from '@/service/entity/service.entity'
import { Model, Types } from 'mongoose'
import { ServiceModel } from '../model/service.model'
import { PaginationOptionDto } from '@/common/dto/option-pagination.dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import { ServiceCriteriaDto } from '@/service/dto/service-criteria.dto'

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
  async find(
    filter: Partial<ServiceCriteriaDto>,
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    const { limit, page } = options
    const skip = (page - 1) * limit
    const items = await this.model.find(filter).skip(skip).limit(limit).exec()
    const total = await this.model.countDocuments(filter).exec()
    const result: PaginationResultDto<IService> = {
      page,
      pages: Math.ceil(total / limit),
      total,
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
    return await this.model.create(entity)
  }
}
