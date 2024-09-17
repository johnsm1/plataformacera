import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceCriteriaDto } from '../dto/service-criteria.dto'
import { IService } from '../entity/service.entity'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import { ServiceRepository } from '@/infra/database/repository'

export class FindByUseCase
  implements UseCase<ServiceCriteriaDto, PaginationResultDto<IService>>
{
  constructor(private serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository
  }
  async execute(
    criteria: ServiceCriteriaDto
  ): Promise<PaginationResultDto<IService>> {
    const { _id, vehicle, client, status, page = 1, limit = 10 } = criteria

    const filter: Partial<IService> = {
      ...(_id && { _id }),
      ...(vehicle && { vehicle }),
      ...(client && { client }),
      ...(status && { status }),
    }
    return await this.serviceRepository.findBy(filter, { page, limit })
  }
}
