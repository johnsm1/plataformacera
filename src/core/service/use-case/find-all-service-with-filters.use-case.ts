import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { ServiceFindByCriteriaDto } from '../dto'
import { PaginationResultDto } from '@/common/dto/pagination-result.dto'
import { IService } from '../entity'
import { ICustomer } from '@/core/customer/entity'
import { IVehicle } from '@/core/vehicle/entity'

export class FindAllServiceWithFiltersUseCase {
  public constructor(
    private customerFacade: CustomerFacade,
    private vehicleFacade: VehicleFacade,
    private serviceRepository: ServiceRepository
  ) {
    this.serviceRepository = serviceRepository
    this.customerFacade = customerFacade
    this.vehicleFacade = vehicleFacade
  }

  public async execute(
    criteria: ServiceFindByCriteriaDto
  ): Promise<PaginationResultDto<IService>> {
    const { id, vehicle, customer, status, page = 1, limit = 10 } = criteria
    let savedCustomer: ICustomer | undefined
    let savedVehicle: IVehicle | undefined
    if (customer) {
      savedCustomer = await this.customerFacade.findById(customer)
    }

    if (vehicle) {
      savedVehicle = await this.vehicleFacade.findById(vehicle)
    }

    const filter: Partial<IService> = {
      ...(id && { _id: id }),
      ...(savedVehicle && { vehicle: savedVehicle }),
      ...(savedCustomer && { customer: savedCustomer }),
      ...(status && { status }),
    }
    return this.serviceRepository.findAll(filter, { page, limit })
  }
}
