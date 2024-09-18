import { UseCase } from '@/common/usecase/use-case.interface'
import ServiceFacade from '@/facade/service.facade'
import mongoose from 'mongoose'

export class DeleteUseCase implements UseCase<string, boolean> {
  constructor(private serviceFacade: ServiceFacade) {
    this.serviceFacade = serviceFacade
  }
  async execute(id: string): Promise<boolean> {
    const objectId = new mongoose.Types.ObjectId(id)
    const service = await this.serviceFacade.delete(objectId)
    if (!service) {
      return false
    }
    return true
  }
}
