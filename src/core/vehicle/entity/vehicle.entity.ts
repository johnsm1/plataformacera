import { BaseEntity } from '@/common/entity/base-entity.interface'

export interface IVehicle extends BaseEntity {
  numberPlate: string
  model: string
  year: number
}
