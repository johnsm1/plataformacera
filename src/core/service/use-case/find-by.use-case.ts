import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceCriteriaDto } from '../dto/service-criteria.dto'
import { IService } from '@/core/service/entity'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import ServiceFacade from '@/facade/service.facade'

export class FindByUseCase
  implements UseCase<ServiceCriteriaDto, PaginationResultDto<IService>>
{
  constructor(private serviceFacade: ServiceFacade) {
    this.serviceFacade = serviceFacade
  }
  async execute(): Promise<PaginationResultDto<IService>> {
    // const { _id, vehicle, client, status, page = 1, limit = 10 } = criteria

    // const filter: Partial<IService> = {
    //   ...(_id && { _id }),
    //   ...(vehicle && { vehicle }),
    //   ...(client && { client }),
    //   ...(status && { status }),
    // }
    // return await this.serviceFacade.findBy(filter, { page, limit })

    throw new Error('Metod not implemented')
  }
}
