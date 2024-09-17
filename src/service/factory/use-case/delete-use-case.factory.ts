import { ServiceRepository } from '@/infra/database/repository'
import { DeleteUseCase } from '@/service/use-case'

export function makeDeleteUseCase(): DeleteUseCase {
  const serviceRepository = new ServiceRepository()
  return new DeleteUseCase(serviceRepository)
}
