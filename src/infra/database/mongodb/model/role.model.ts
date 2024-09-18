import { IRole } from '@/core/auth/entity/role.entity'
import { model } from 'mongoose'
import { RoleSchema } from '../schema'

export const RoleModel = model<IRole>('Role', RoleSchema, 'roles')
