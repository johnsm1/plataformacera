import { Types } from 'mongoose'
import { ServiceStatus } from '../enum/service-status.enum'

export class ServiceCriteriaDto {
  _id?: Types.ObjectId
  vehicle?: Types.ObjectId
  client?: Types.ObjectId
  status?: ServiceStatus
  page?: number
  limit?: number
}
