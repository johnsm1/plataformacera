import { model } from 'mongoose'
import { ClientSchema, IClientDocument } from '../schema/client.schema'

export const ClientModel = model<IClientDocument>('Client', ClientSchema)
