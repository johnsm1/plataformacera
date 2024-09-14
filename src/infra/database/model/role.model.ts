import { model } from 'mongoose'

import { Role } from '@/auth/entity/role.entity'
import { RoleSchema } from '@/infra/database/schema'

export const RoleModel = model<Role>('Role', RoleSchema, 'role')
