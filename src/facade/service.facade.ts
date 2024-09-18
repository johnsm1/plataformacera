import { PaginationOptionDto } from '@/common/dto/option-pagination.dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import { IService } from '@/core/service/entity/service.entity'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { Types } from 'mongoose'

class ServiceFacade {
  private serviceRepository: ServiceRepository

  constructor() {
    this.serviceRepository = new ServiceRepository()
  }

  public static makeServiceFacade(): ServiceFacade {
    return new ServiceFacade()
  }

  public async save(service: IService): Promise<IService> {
    return await this.serviceRepository.save(service)
  }

  public async findById(id: string): Promise<IService> {
    return await this.serviceRepository.findById(id)
  }

  public async delete(id: Types.ObjectId): Promise<IService> {
    return await this.serviceRepository.delete(id)
  }

  public async findAll(
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    return await this.serviceRepository.findAll(options)
  }

  public async findBy(
    filter: Partial<IService>,
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    return await this.serviceRepository.findBy(filter, options)
  }
}

export default ServiceFacade
