import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { DeleteServiceUseCase } from '../use-case/delete-service.use-case'

export class DeleteServiceUseCaseFactory {
  public static create(): DeleteServiceUseCase {
    const serviceRepository = new ServiceRepository()
    return new DeleteServiceUseCase(serviceRepository)
  }
}
