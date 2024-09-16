import { FindAllUseCase } from '@/service/use-case'

export function makeFindAllUseCase(): FindAllUseCase {
  return new FindAllUseCase()
}
