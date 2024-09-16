import { FindByUseCase } from '@/service/use-case'

export function makeFindByUseCase(): FindByUseCase {
  return new FindByUseCase()
}
