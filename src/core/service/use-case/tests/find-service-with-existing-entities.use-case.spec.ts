import { HttpException } from '@/common/exception/http-exception.error'
import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { ServiceMapper } from '@/core/service/mapper'
import { FindServiceWithExistingUseCase } from '../find-service-with-existing-entities.use-case'
import {
  createMocks,
  mockCustomer,
  mockVehicle,
  mockService,
  mockServiceDto,
  mockCustomerDto,
  mockVehicleDto,
} from './mocks/service.mock'

jest.mock('@/core/customer/facade')
jest.mock('@/core/vehicle/facade')
jest.mock('@/infra/database/mongodb/repository')
jest.mock('@/core/service/mapper/service.mapper')

describe('FindServiceWithExistingUseCase', () => {
  let serviceRepository: jest.Mocked<ServiceRepository>
  let vehicleFacade: jest.Mocked<VehicleFacade>
  let customerFacade: jest.Mocked<CustomerFacade>
  let useCase: FindServiceWithExistingUseCase

  beforeEach(() => {
    jest.clearAllMocks()
    const mocks = createMocks()

    customerFacade = mocks.customerFacade
    vehicleFacade = mocks.vehicleFacade
    serviceRepository = mocks.serviceRepository

    useCase = new FindServiceWithExistingUseCase(
      customerFacade,
      vehicleFacade,
      serviceRepository
    )
  })

  it('should throw an error if the service is not found', async () => {
    serviceRepository.findById.mockResolvedValue(null)

    await expect(useCase.execute('non-existing-id')).rejects.toThrow(
      HttpException
    )
    await expect(useCase.execute('non-existing-id')).rejects.toThrow(
      new HttpException('Service not found', 404)
    )
  })

  it('should return a ServiceDto when the service is found', async () => {
    const customerMock = mockCustomer({ id: 'existing_customer_id' })
    const vehicleMock = mockVehicle({ id: 'existing_vehicle_id' })
    const customerMockDto = mockCustomerDto({ id: customerMock.id })
    const vehicleMockDto = mockVehicleDto({ id: vehicleMock.id })
    const serviceId = 'existing_service_id'
    const serviceMock = mockService({
      id: serviceId,
      customer: customerMock,
      vehicle: vehicleMock,
    })
    const expectedDto = mockServiceDto({
      vehicle: vehicleMockDto,
      customer: customerMockDto,
      id: serviceMock.id,
    })

    serviceRepository.findById.mockResolvedValue(serviceMock)
    customerFacade.findById.mockResolvedValue(customerMock)
    vehicleFacade.findById.mockResolvedValue(vehicleMock)
    jest.spyOn(ServiceMapper, 'mapEntityToDto').mockReturnValue(expectedDto)

    const result = await useCase.execute(serviceId)

    expect(result).toEqual(expectedDto)
    expect(serviceRepository.findById).toHaveBeenCalledWith(expect.any(String))
    expect(customerFacade.findById).toHaveBeenCalledWith(expect.any(String))
    expect(vehicleFacade.findById).toHaveBeenCalledWith(expect.any(String))
  })

  it('should throw an error if the customer is not found', async () => {
    const vehicleMock = mockVehicle({ id: 'existing_vehicle_id' })
    const serviceMock = mockService({ vehicle: vehicleMock })

    serviceRepository.findById.mockResolvedValue(serviceMock)
    customerFacade.findById.mockResolvedValue(null)
    vehicleFacade.findById.mockResolvedValue(vehicleMock)

    await expect(useCase.execute('service-id')).rejects.toThrow(HttpException)
    await expect(useCase.execute('service-id')).rejects.toThrow(
      new HttpException('Customer not found', 404)
    )
  })

  it('should throw an error if the vehicle is not found', async () => {
    const customerMock = mockCustomer({ id: 'existing_customer_id' })
    const serviceMock = mockService({ customer: customerMock })

    serviceRepository.findById.mockResolvedValue(serviceMock)
    customerFacade.findById.mockResolvedValue(customerMock)
    vehicleFacade.findById.mockResolvedValue(null)

    await expect(useCase.execute('service-id')).rejects.toThrow(HttpException)
    await expect(useCase.execute('service-id')).rejects.toThrow(
      new HttpException('Customer not found', 404)
    )
  })
})
