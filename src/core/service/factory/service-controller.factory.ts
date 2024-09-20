import { ServiceController } from '@/core/service/controller'
import { FindAllServiceWithFiltersUseCaseFactory } from './find-all-service-with-filters.use-case.factory'
import { FindServiceWithExistingUseCaseFactory } from './find-service-with-existing-entities-use-case.factory'
import { SaveServiceWithExistingEntitiesUseCaseFactory } from './save-service-with-existing-entities-use-case.factory'
import { DeleteServiceUseCaseFactory } from './delete-service.use-case.factory'
import { UpdateServiceUseCaseFactory } from './update-service.use-case.factory'

export class ServiceControllerFactory {
  public static create(): ServiceController {
    return new ServiceController(
      SaveServiceWithExistingEntitiesUseCaseFactory.create(),
      FindServiceWithExistingUseCaseFactory.create(),
      FindAllServiceWithFiltersUseCaseFactory.create(),
      DeleteServiceUseCaseFactory.create(),
      UpdateServiceUseCaseFactory.create()
    )
  }
}
