import { IsNotEmpty } from 'class-validator'
import { ServiceStatus } from '@/core/service/enum'

export class ServiceDto {
  id?: string
  description: string
  completionDate: Date
  vehicle: string
  customer: string
  status: ServiceStatus
  value: number
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
}
