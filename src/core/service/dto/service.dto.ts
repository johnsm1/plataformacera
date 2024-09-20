import { IsNotEmpty } from 'class-validator'
import { ServiceStatus } from '@/core/service/enum'
import { VehicleDto } from '@/core/vehicle/dto'
import { CustomerDto } from '@/core/customer/dto'

export class ServiceDto {
  id?: string
  description: string
  completionDate: Date
  vehicle: VehicleDto
  customer: CustomerDto
  status: ServiceStatus
  value: number
}

export class UpdateServiceDto {
  description?: string
  completionDate?: Date
  vehicle?: string
  customer?: string
  status?: ServiceStatus
  value?: number
}

export class ServiceFindByCriteriaDto {
  id?: string
  vehicle?: string
  customer?: string
  status?: ServiceStatus
  page?: number
  limit?: number

  static getFields(): string[] {
    return ['id', 'vehicle', 'customer', 'status', 'page', 'limit']
  }
}

export class SaveServiceWithExistingEntitiesInputDto {
  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  vehicleId: string

  @IsNotEmpty()
  customerId: string

  @IsNotEmpty()
  value: number

  @IsNotEmpty()
  status: ServiceStatus
}
