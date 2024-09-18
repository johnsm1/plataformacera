import { BaseEntity } from '@/common/entity/base-entity.interface'
import { ServiceStatus } from '@/core/service/enum'
import { ICustomer } from '@/core/customer/entity'
import { IVehicle } from '@/core/vehicle/entity'

export interface IService extends BaseEntity {
  description: string
  completionDate: Date
  vehicle: IVehicle
  customer: ICustomer
  status: ServiceStatus
  value: number
}
