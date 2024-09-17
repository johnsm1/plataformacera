import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceRepository } from '@/infra/database/repository'
import mongoose from 'mongoose'

export class DeleteUseCase implements UseCase<string, boolean> {
  constructor(private serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository
  }
  async execute(id: string): Promise<boolean> {
    const objectId = new mongoose.Types.ObjectId(id)
    const service = await this.serviceRepository.delete(objectId)
    if (!service) {
      return false
    }
    return true
  }
}
