import { UpdateUseCase } from '@/service/use-case'

export function makeUpdateUseCase(): UpdateUseCase {
  return new UpdateUseCase()
}
