import { ServiceController } from '@/core/service/controller'
import { SaveServiceWithExistingEntitiesUseCaseFactory } from '@/core/service/factory'

export class ServiceControllerFactory {
  public static create(): ServiceController {
    return new ServiceController(
      SaveServiceWithExistingEntitiesUseCaseFactory.create()
    )
  }
}
