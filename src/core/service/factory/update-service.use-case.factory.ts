import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { UpdateServiceUseCase } from '@/core/service/use-case/update-service.use-case'

export class UpdateServiceUseCaseFactory {
  public static create(): UpdateServiceUseCase {
    const serviceRepository = new ServiceRepository()
    return new UpdateServiceUseCase(serviceRepository)
  }
}
