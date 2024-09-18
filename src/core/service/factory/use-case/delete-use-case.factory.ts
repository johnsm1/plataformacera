import ServiceFacade from '@/facade/service.facade'
import { DeleteUseCase } from '../../use-case'

export function makeDeleteUseCase(): DeleteUseCase {
  const serviceFacade = ServiceFacade.makeServiceFacade()
  return new DeleteUseCase(serviceFacade)
}
