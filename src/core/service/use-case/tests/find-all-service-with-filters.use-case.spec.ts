import { PaginationResultDto } from '@/common/dto'
import { ICustomer } from '@/core/customer/entity'
import { CustomerFacade } from '@/core/customer/facade'
import { IVehicle } from '@/core/vehicle/entity'
import { VehicleFacade } from '@/core/vehicle/facade'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { FindAllServiceWithFiltersUseCase } from '..'

import { ServiceFindByCriteriaDto } from '../../dto'
import { IService } from '../../entity'
import { ServiceStatus } from '../../enum'
import { createMocks } from './mocks/service.mock'

const mockCustomer: ICustomer = {
  /* populate with mock data */
} as ICustomer
const mockVehicle: IVehicle = {
  /* populate with mock data */
} as IVehicle
const mockPaginationResult: PaginationResultDto<IService> = {
  /* populate with mock data */
} as PaginationResultDto<IService>

describe('FindAllServiceWithFiltersUseCase', () => {
  let serviceRepository: jest.Mocked<ServiceRepository>
  let vehicleFacade: jest.Mocked<VehicleFacade>
  let customerFacade: jest.Mocked<CustomerFacade>
  let useCase: FindAllServiceWithFiltersUseCase
  beforeEach(() => {
    const mocks = createMocks()

    customerFacade = mocks.customerFacade
    vehicleFacade = mocks.vehicleFacade
    serviceRepository = mocks.serviceRepository

    useCase = new FindAllServiceWithFiltersUseCase(
      customerFacade,
      vehicleFacade,
      serviceRepository
    )
  })

  it('should find services with all filters applied', async () => {
    const criteria: ServiceFindByCriteriaDto = {
      id: '66eb11cbef0b61f8a77b905c',
      customer: '66eb11cbef0b61f8a77b905c',
      vehicle: '66eb11cbef0b61f8a77b905c',
      status: ServiceStatus.PENDING,
      page: 1,
      limit: 10,
    }

    customerFacade.findById.mockResolvedValue(mockCustomer)
    vehicleFacade.findById.mockResolvedValue(mockVehicle)
    serviceRepository.findAll.mockResolvedValue(mockPaginationResult)

    const result = await useCase.execute(criteria)

    expect(customerFacade.findById).toHaveBeenCalledWith(
      '66eb11cbef0b61f8a77b905c'
    )
    expect(vehicleFacade.findById).toHaveBeenCalledWith(
      '66eb11cbef0b61f8a77b905c'
    )
    expect(serviceRepository.findAll).toHaveBeenCalledWith(
      {
        _id: '66eb11cbef0b61f8a77b905c',
        customer: mockCustomer,
        vehicle: mockVehicle,
        status: ServiceStatus.PENDING,
      },
      { page: 1, limit: 10 }
    )
    expect(result).toEqual(mockPaginationResult)
  })

  it('should handle missing customer and vehicle', async () => {
    const criteria: ServiceFindByCriteriaDto = {
      id: '66eb11cbef0b61f8a77b905c',
      status: ServiceStatus.PENDING,
      page: 1,
      limit: 10,
    }

    serviceRepository.findAll.mockResolvedValue(mockPaginationResult)

    const result = await useCase.execute(criteria)

    expect(customerFacade.findById).not.toHaveBeenCalled()
    expect(vehicleFacade.findById).not.toHaveBeenCalled()
    expect(serviceRepository.findAll).toHaveBeenCalledWith(
      {
        _id: '66eb11cbef0b61f8a77b905c',
        status: ServiceStatus.PENDING,
      },
      { page: 1, limit: 10 }
    )
    expect(result).toEqual(mockPaginationResult)
  })

  it('should handle no filters', async () => {
    const criteria: ServiceFindByCriteriaDto = {
      page: 1,
      limit: 10,
    }

    serviceRepository.findAll.mockResolvedValue(mockPaginationResult)

    const result = await useCase.execute(criteria)

    expect(customerFacade.findById).not.toHaveBeenCalled()
    expect(vehicleFacade.findById).not.toHaveBeenCalled()
    expect(serviceRepository.findAll).toHaveBeenCalledWith(
      {},
      { page: 1, limit: 10 }
    )
    expect(result).toEqual(mockPaginationResult)
  })
})
