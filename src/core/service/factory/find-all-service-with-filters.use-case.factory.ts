import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'
import { FindAllServiceWithFiltersUseCase } from '../use-case/find-all-service-with-filters.use-case'

export class FindAllServiceWithFiltersUseCaseFactory {
  public static create(): FindAllServiceWithFiltersUseCase {
    const serviceRepository = new ServiceRepository()
    const customerFacade = new CustomerFacade()
    const vehicleFacade = new VehicleFacade()
    return new FindAllServiceWithFiltersUseCase(
      customerFacade,
      vehicleFacade,
      serviceRepository
    )
  }
}
