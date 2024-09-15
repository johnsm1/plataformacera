import { Schema } from 'mongoose'

import { IRole } from '@/auth/entity/role.entity'

export const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true },
  permissions: { type: [String], required: true },
})
