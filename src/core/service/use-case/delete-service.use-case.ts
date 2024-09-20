import { ServiceRepository } from '@/infra/database/mongodb/repository'
import mongoose from 'mongoose'

export class DeleteServiceUseCase {
  public constructor(private serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository
  }

  public async execute(id: string): Promise<boolean> {
    const objectId = new mongoose.Types.ObjectId(id)
    const service = await this.serviceRepository.delete(objectId)
    if (!service) {
      return false
    }
    return true
  }
}
