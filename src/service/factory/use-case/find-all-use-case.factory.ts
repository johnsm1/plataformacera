import ServiceFacade from '@/facade/service.facade'
import { FindAllUseCase } from '@/service/use-case'

export function makeFindAllUseCase(): FindAllUseCase {
  const serviceFacade = ServiceFacade.makeServiceFacade()
  return new FindAllUseCase(serviceFacade)
}
