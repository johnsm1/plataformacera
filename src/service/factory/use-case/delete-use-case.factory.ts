import { DeleteUseCase } from '@/service/use-case'

export function makeDeleteUseCase(): DeleteUseCase {
  return new DeleteUseCase()
}
