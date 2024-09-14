import { Schema } from 'mongoose'

import { Role } from '@/auth/entity/role.entity'

export const RoleSchema = new Schema<Role>({
  name: { type: String, required: true },
  permissions: { type: [String], required: true },
})
