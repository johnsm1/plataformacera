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
    const { serviceId, vehicleId, clientId, status, page, limit } = criteria

    const filter: Partial<ServiceCriteriaDto> = {
      ...(serviceId && { serviceId }),
      ...(vehicleId && { vehicleId }),
      ...(clientId && { clientId }),
      ...(status && { status }),
    }

    return this.serviceRepository.find(filter, { page, limit })
  }
}
