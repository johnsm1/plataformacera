import { ServiceStatus } from '../enum/service-status.enum'
import { Types } from 'mongoose'

export interface IService {
  _id?: Types.ObjectId
  description: string
  dateService: Date
  vehicle: Types.ObjectId
  client: Types.ObjectId
  status: ServiceStatus
  value: number
}
