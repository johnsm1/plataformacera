import ServiceFacade from '@/facade/service.facade'
import { DeleteUseCase } from '@/service/use-case'

export function makeDeleteUseCase(): DeleteUseCase {
  const serviceFacade = ServiceFacade.makeServiceFacade()
  return new DeleteUseCase(serviceFacade)
}
