import ServiceFacade from '@/facade/service.facade'
import { FindByUseCase } from '../../use-case'

export function makeFindByUseCase(): FindByUseCase {
  const serviceFacade = ServiceFacade.makeServiceFacade()
  return new FindByUseCase(serviceFacade)
}
