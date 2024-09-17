import { UseCase } from '@/common/usecase/use-case.interface'
import { IService } from '../entity/service.entity'
import { ServiceRepository } from '@/infra/database/repository'
import { PaginationOptionDto } from '@/common/dto/option-pagination.dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'

export class FindAllUseCase
  implements UseCase<PaginationOptionDto, PaginationResultDto<IService>>
{
  constructor(private serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository
  }
  async execute(
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    return await this.serviceRepository.findAll(options)
  }
}
