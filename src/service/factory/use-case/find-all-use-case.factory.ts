import { ServiceRepository } from '@/infra/database/repository'
import { FindAllUseCase } from '@/service/use-case'

export function makeFindAllUseCase(): FindAllUseCase {
  const serviceRepository = new ServiceRepository()
  return new FindAllUseCase(serviceRepository)
}
