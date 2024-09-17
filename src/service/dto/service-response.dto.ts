import { CreateClientRequestDTO } from '@/client/dto/client-request.dto'
import { VehicleRequestDTO } from '@/vehicle/dto/vehicle-request.dto'
import { Types } from 'mongoose'
import { ServiceStatus } from '../enum/service-status.enum'

export class ServiceResponseDTO {
  id?: Types.ObjectId

  description: string

  vehicle: VehicleRequestDTO

  client: CreateClientRequestDTO

  status: ServiceStatus

  dateService: Date

  value: number

  constructor(serviceId: Types.ObjectId) {
    this.id = serviceId
  }
}
