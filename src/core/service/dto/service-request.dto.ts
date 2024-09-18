import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { ServiceStatus } from '../enum/service-status.enum'
import { CreateClientRequestDTO } from '@/core/client/dto/client-request.dto'
import { VehicleRequestDTO } from '@/core/vehicle/dto/vehicle-request.dto'

export class ServiceRequestDTO {
  @IsString()
  @IsNotEmpty()
  description: string

  @ValidateNested()
  @Type(() => VehicleRequestDTO)
  vehicle: VehicleRequestDTO

  @ValidateNested()
  @Type(() => CreateClientRequestDTO)
  client: CreateClientRequestDTO

  @IsString()
  @IsNotEmpty()
  status: ServiceStatus

  @IsNotEmpty()
  dateService: Date

  @IsNumber()
  value: number
}
