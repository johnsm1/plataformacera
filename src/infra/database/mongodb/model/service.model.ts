import { IService } from '@/core/service/entity/service.entity'
import { model } from 'mongoose'
import { serviceSchema } from '@/infra/database/mongodb/schema'

export const ServiceModel = model<IService>(
  'Service',
  serviceSchema,
  'services'
)
