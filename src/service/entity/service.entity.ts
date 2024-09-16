import { IClient } from '@/client/entity/client.entity'
import { IVehicle } from '@/vehicle/entity/vehicle.entity'
import { ServiceStatus } from '../enum/service-status.enum'

export interface IService {
  serviceId: string
  description: string
  date: Date
  vehicle: IVehicle
  client: IClient
  status: ServiceStatus
  value: number
}
