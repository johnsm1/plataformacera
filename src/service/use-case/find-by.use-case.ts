/* eslint-disable */
import { UseCase } from '@/common/usecase/use-case.interface'

export class FindByUseCase implements UseCase<string, string> {
  constructor() {}
  async execute(input: string): Promise<string> {
    return 'ok'
  }
}
