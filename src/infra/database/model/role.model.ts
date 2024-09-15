import { model } from 'mongoose'

import { IRole } from '@/auth/entity/role.entity'
import { RoleSchema } from '@/infra/database/schema'

export const RoleModel = model<IRole>('Role', RoleSchema, 'role')
