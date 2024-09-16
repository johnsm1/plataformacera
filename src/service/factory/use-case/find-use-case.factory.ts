import { FindUseCase } from '@/service/use-case'

export function makeFindUseCase(): FindUseCase {
  return new FindUseCase()
}
