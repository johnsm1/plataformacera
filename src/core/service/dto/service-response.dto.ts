import { Types } from 'mongoose'
import { ServiceStatus } from '../enum/service-status.enum'
import { ClientResponseDTO } from '@/core/client/dto/client-response.dto'
import { VehicleResponseDTO } from '@/core/vehicle/dto/vehicle-response.dto'

export class ServiceResponseDTO {
  id?: Types.ObjectId

  description: string

  vehicle: VehicleResponseDTO

  client: ClientResponseDTO

  status: ServiceStatus

  dateService: Date

  value: number

  constructor(serviceId: Types.ObjectId) {
    this.id = serviceId
  }
}
