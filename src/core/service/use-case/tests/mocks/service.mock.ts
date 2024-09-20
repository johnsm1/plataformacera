/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomerDto } from '@/core/customer/dto'
import { ICustomer } from '@/core/customer/entity'
import { CustomerFacade } from '@/core/customer/facade'
import {
  FindCustomerByIdUseCase,
  SaveCustomerUseCase,
} from '@/core/customer/use-case'
import {
  SaveServiceWithExistingEntitiesInputDto,
  ServiceDto,
  UpdateServiceDto,
} from '@/core/service/dto'
import { IService } from '@/core/service/entity'
import { ServiceStatus } from '@/core/service/enum'
import { VehicleDto } from '@/core/vehicle/dto'
import { IVehicle } from '@/core/vehicle/entity'
import { VehicleFacade } from '@/core/vehicle/facade'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { randomUUID } from 'crypto'

export function mockSaveServiceWithExistingEntitiesInputDto(
  params?: Partial<SaveServiceWithExistingEntitiesInputDto>
): SaveServiceWithExistingEntitiesInputDto {
  return {
    description: 'Oil change and inspection',
    vehicleId: '66eb105ac732ab5c310b23af',
    customerId: '66eb105ac732ab5c310b23af',
    value: 150,
    status: ServiceStatus.PENDING,
    ...params,
  }
}
export function mockVehicleDto(params?: Partial<VehicleDto>): VehicleDto {
  return {
    id: 'abc123def456',
    numberPlate: 'XYZ-1234',
    model: 'Toyota Corolla',
    year: 2020,
    ...params,
  }
}

export function mockCustomerDto(params?: Partial<CustomerDto>): CustomerDto {
  return {
    id: 'cust123456',
    name: 'John Doe',
    ...params,
  }
}

export function mockServiceDto(params?: Partial<ServiceDto>): ServiceDto {
  return {
    id: '1a2b3c4d5e6f7g8h9i0j',
    description: 'Full service and inspection',
    completionDate: new Date(),
    vehicle: mockVehicleDto({ ...params.vehicle }),
    customer: mockCustomerDto({ ...params.customer }),
    status: ServiceStatus.PENDING,
    value: 300,
    ...params,
  }
}

export function mockUpdateServiceDto(
  params?: Partial<UpdateServiceDto>
): UpdateServiceDto {
  return {
    description: params?.description ?? null,
    completionDate: params?.completionDate ?? null,
    vehicle: params?.vehicle ?? null,
    customer: params?.customer ?? null,
    status: params?.status ?? null,
    value: params?.value ?? null,
  }
}

export function mockCustomer(params?: Partial<ICustomer>): ICustomer {
  const customer: ICustomer = {
    id: randomUUID(),
    name: 'any_name',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...params,
  }
  return customer
}

export function mockVehicle(params?: Partial<IVehicle>): IVehicle {
  const vehicle: IVehicle = {
    id: randomUUID(),
    model: 'any_model',
    numberPlate: 'any_numberPlate',
    year: 2020,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...params,
  }
  return vehicle
}

export function mockService(params?: Partial<IService>): IService {
  const service: IService = {
    description: 'any_description',
    completionDate: new Date(),
    vehicle: mockVehicle({ ...params.vehicle }),
    customer: mockCustomer({ ...params.customer }),
    status: ServiceStatus.PENDING,
    value: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    ...params,
  }
  return service
}

export const createMocks = () => {
  const serviceRepository = {
    save: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    model: {} as any,
  } as jest.Mocked<ServiceRepository>

  const vehicleFacade = {
    findById: jest.fn(),
    findVehicleByIdUseCase: {} as any,
  } as jest.Mocked<VehicleFacade>

  const customerFacade = {
    saveCustomerUseCase: {} as SaveCustomerUseCase,
    findCustomerByIdUseCase: {} as FindCustomerByIdUseCase,
    save: jest.fn(),
    findById: jest.fn(),
  } as jest.Mocked<CustomerFacade>

  return { serviceRepository, vehicleFacade, customerFacade }
}
