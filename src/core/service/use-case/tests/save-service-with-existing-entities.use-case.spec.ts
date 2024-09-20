import { SaveServiceWithExistingEntitiesUseCase } from '..'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'
import { HttpException } from '@/common/exception/http-exception.error'
import {
  createMocks,
  mockCustomer,
  mockSaveServiceWithExistingEntitiesInputDto,
  mockService,
  mockVehicle,
} from './mocks/service.mock'

describe('SaveServiceWithExistingEntitiesUseCase', () => {
  let serviceRepository: jest.Mocked<ServiceRepository>
  let vehicleFacade: jest.Mocked<VehicleFacade>
  let customerFacade: jest.Mocked<CustomerFacade>
  let useCase: SaveServiceWithExistingEntitiesUseCase

  beforeEach(() => {
    const mocks = createMocks()

    customerFacade = mocks.customerFacade
    vehicleFacade = mocks.vehicleFacade
    serviceRepository = mocks.serviceRepository

    useCase = new SaveServiceWithExistingEntitiesUseCase(
      serviceRepository,
      customerFacade,
      vehicleFacade
    )
  })

  it('should throw an error if the customer does not exist', async () => {
    customerFacade.findById.mockResolvedValue(undefined)

    const dto = mockSaveServiceWithExistingEntitiesInputDto({
      customerId: 'non_existent_id',
      vehicleId: 'any_vehicle_id',
    })

    await expect(useCase.execute(dto)).rejects.toThrow(
      new HttpException(
        `Customer with ID non_existent_id was not found. Please verify the ID and try again.`,
        404
      )
    )

    expect(customerFacade.findById).toHaveBeenCalledWith('non_existent_id')
  })

  it('should throw an error if the vehicle does not exist', async () => {
    const customer = mockCustomer()
    customerFacade.findById.mockResolvedValue(customer)
    vehicleFacade.findById.mockResolvedValue(undefined)

    const dto = mockSaveServiceWithExistingEntitiesInputDto({
      customerId: 'existing_customer_id',
      vehicleId: 'non_existent_vehicle_id',
    })

    await expect(useCase.execute(dto)).rejects.toThrow(
      new HttpException(
        `Vehicle with ID non_existent_vehicle_id was not found. Please verify the ID and try again.`,
        404
      )
    )

    expect(vehicleFacade.findById).toHaveBeenCalledWith(
      'non_existent_vehicle_id'
    )
  })

  it('should save the service correctly when customer and vehicle exist', async () => {
    const customerMock = mockCustomer({ id: 'existing_customer_id' })
    const vehicleMock = mockVehicle({ id: 'existing_vehicle_id' })
    const dto = mockSaveServiceWithExistingEntitiesInputDto({
      customerId: 'existing_customer_id',
      vehicleId: 'existing_vehicle_id',
    })
    const serviceMock = mockService({
      vehicle: vehicleMock,
      customer: customerMock,
    })
    customerFacade.findById.mockResolvedValue(customerMock)
    vehicleFacade.findById.mockResolvedValue(vehicleMock)
    serviceRepository.save.mockResolvedValue(serviceMock)

    const result = await useCase.execute(dto)

    expect(result).toEqual(serviceMock)
    expect(customerFacade.findById).toHaveBeenCalledWith('existing_customer_id')
    expect(vehicleFacade.findById).toHaveBeenCalledWith('existing_vehicle_id')
    expect(serviceRepository.save).toHaveBeenCalledWith(expect.anything())
  })
})
