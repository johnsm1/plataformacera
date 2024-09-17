import { ServiceRepository } from '@/infra/database/repository'
import { FindByUseCase } from '@/service/use-case'

export function makeFindByUseCase(): FindByUseCase {
  const serviceRepository = new ServiceRepository()
  return new FindByUseCase(serviceRepository)
}
