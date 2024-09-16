import { IService } from '@/service/entity/service.entity'
import { ServiceSchema } from '../schema/service.schema'
import { model } from 'mongoose'

export const ServiceModel = model<IService>('Service', ServiceSchema, 'service')
