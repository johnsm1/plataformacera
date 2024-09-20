import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { FindServiceWithExistingUseCase } from '@/core/service/use-case/find-service-with-existing-entities.use-case'
import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'

export class FindServiceWithExistingUseCaseFactory {
  public static create(): FindServiceWithExistingUseCase {
    const serviceRepository = new ServiceRepository()
    const customerFacade = new CustomerFacade()
    const vehicleFacade = new VehicleFacade()
    return new FindServiceWithExistingUseCase(
      customerFacade,
      vehicleFacade,
      serviceRepository
    )
  }
}
