import { IClient } from '@/client/entity/client.entity'
import { model } from 'mongoose'
import { clientSchema } from '../schema/client.schema'

export const RoleModel = model<IClient>('IClient', clientSchema, 'client')
