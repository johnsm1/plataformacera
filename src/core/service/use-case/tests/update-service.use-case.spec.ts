import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { UpdateServiceUseCase } from '../update-service.use-case'
import {
  createMocks,
  mockService,
  mockUpdateServiceDto,
} from './mocks/service.mock'
import { HttpException } from '@/common/exception/http-exception.error'
import mongoose from 'mongoose'
import { ServiceStatus } from '../../enum'

describe('UpdateServiceUseCase', () => {
  let serviceRepository: jest.Mocked<ServiceRepository>
  let updateServiceUseCase: UpdateServiceUseCase

  beforeEach(() => {
    const mocks = createMocks()
    serviceRepository = mocks.serviceRepository
    updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
  })

  it('should update a service successfully', async () => {
    const id = '507f1f77bcf86cd799439011'
    const description = 'Updated Description'
    const dto = mockUpdateServiceDto({ description })
    const updateServiceMock = mockService({ description })
    serviceRepository.findByIdAndUpdate.mockResolvedValue(updateServiceMock)

    const result = await updateServiceUseCase.execute(id, dto)

    expect(result).toEqual(updateServiceMock)
    expect(serviceRepository.findByIdAndUpdate).toHaveBeenCalledWith(
      new mongoose.Types.ObjectId(id),
      dto
    )
  })

  it('should throw an error if service not found', async () => {
    const id = '507f1f77bcf86cd799439011'
    new mongoose.Types.ObjectId(id)
    const dto = mockUpdateServiceDto({
      completionDate: new Date(),
      status: ServiceStatus.COMPLETED,
    })

    serviceRepository.findByIdAndUpdate.mockResolvedValue(null)

    await expect(updateServiceUseCase.execute(id, dto)).rejects.toThrow(
      new HttpException(`Serviço com ID ${id} não encontrado.`, 404)
    )
  })
})
