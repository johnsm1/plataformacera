import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { UpdateServiceDto } from '@/core/service/dto'
import mongoose from 'mongoose'
import { logger } from '@/config/logger'
import { IService } from '@/core/service/entity'
import { HttpException } from '@/common/exception/http-exception.error'

export class UpdateServiceUseCase {
  public constructor(private serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository
  }

  public async execute(id: string, dto: UpdateServiceDto): Promise<IService> {
    const objectId = new mongoose.Types.ObjectId(id)
    const updatedOrder = await this.serviceRepository.findByIdAndUpdate(
      objectId,
      dto
    )

    if (!updatedOrder) {
      throw new HttpException(`Serviço com ID ${id} não encontrado.`, 404)
    }

    logger.info(updatedOrder)
    return updatedOrder
  }
}
