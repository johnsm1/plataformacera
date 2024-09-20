import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { DeleteServiceUseCase } from '..'
import mongoose from 'mongoose'
import {
  createMocks,
  mockCustomer,
  mockService,
  mockVehicle,
} from './mocks/service.mock'

describe('DeleteServiceUseCase', () => {
  let serviceRepository: jest.Mocked<ServiceRepository>
  let deleteServiceUseCase: DeleteServiceUseCase

  beforeEach(() => {
    const mocks = createMocks()
    serviceRepository = mocks.serviceRepository
    deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository)
  })

  it('should return true if the service is successfully deleted', async () => {
    const customerMock = mockCustomer({ id: 'existing_customer_id' })
    const vehicleMock = mockVehicle({ id: 'existing_vehicle_id' })
    const serviceMock = mockService({
      vehicle: vehicleMock,
      customer: customerMock,
    })
    serviceRepository.delete.mockResolvedValue(serviceMock)

    const result = await deleteServiceUseCase.execute(serviceMock.id)

    expect(result).toBe(true)
    expect(serviceRepository.delete).toHaveBeenCalled()
  })

  it('should return false if the service does not exist', async () => {
    serviceRepository.delete.mockResolvedValue(null)

    const result = await deleteServiceUseCase.execute(
      new mongoose.Types.ObjectId().toString()
    )

    expect(result).toBe(false)
    expect(serviceRepository.delete).toHaveBeenCalled()
  })

  it('should call ServiceRepository.delete with correct ObjectId', async () => {
    const serviceId = new mongoose.Types.ObjectId().toString()
    const serviceMock = mockService({ id: serviceId })

    serviceRepository.delete.mockResolvedValue(serviceMock)

    await deleteServiceUseCase.execute(serviceId)

    expect(serviceRepository.delete).toHaveBeenCalledWith(
      new mongoose.Types.ObjectId(serviceId)
    )
  })
})
