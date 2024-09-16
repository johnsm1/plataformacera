import { IClient } from '@/client/entity/client.entity'
import { model } from 'mongoose'
import { ClientSchema } from '../schema/client.schema'

export const ClientModel = model<IClient>('Client', ClientSchema, 'client')
