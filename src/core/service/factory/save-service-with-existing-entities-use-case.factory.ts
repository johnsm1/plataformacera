import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { SaveServiceWithExistingEntitiesUseCase } from '@/core/service/use-case'
import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'

export class SaveServiceWithExistingEntitiesUseCaseFactory {
  public static create(): SaveServiceWithExistingEntitiesUseCase {
    const serviceRepository = new ServiceRepository()
    const customerFacade = new CustomerFacade()
    const vehicleFacade = new VehicleFacade()

    return new SaveServiceWithExistingEntitiesUseCase(
      serviceRepository,
      customerFacade,
      vehicleFacade
    )
  }
}
