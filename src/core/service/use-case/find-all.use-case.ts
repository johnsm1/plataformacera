import { UseCase } from '@/common/usecase/use-case.interface'
import { IService } from '../entity/service.entity'
import { PaginationOptionDto } from '@/common/dto/option-pagination.dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import ServiceFacade from '@/facade/service.facade'

export class FindAllUseCase
  implements UseCase<PaginationOptionDto, PaginationResultDto<IService>>
{
  constructor(private serviceFacade: ServiceFacade) {
    this.serviceFacade = serviceFacade
  }
  async execute(
    options: PaginationOptionDto
  ): Promise<PaginationResultDto<IService>> {
    return await this.serviceFacade.findAll(options)
  }
}
