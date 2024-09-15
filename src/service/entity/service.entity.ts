import { IClient } from '@/client/entity/client.entity'
import { IVehicle } from '@/vehicle/entity/vehicle.entity'

export interface IService {
  serviceId: string
  description: string
  date: Date
  vehicle: IVehicle
  client: IClient
  status: 'Pendente' | 'Em Andamento' | 'Concluído'
  value: number
}
