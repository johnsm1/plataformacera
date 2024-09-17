import { IServiceDocument, ServiceSchema } from '../schema/service.schema'
import { model } from 'mongoose'

export const ServiceModel = model<IServiceDocument>('Service', ServiceSchema)
