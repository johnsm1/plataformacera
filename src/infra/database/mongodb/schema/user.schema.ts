import { Schema, Types } from 'mongoose'

import { IUser } from '@/core/user/entity/user.entity'

export const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: Types.ObjectId, ref: 'Role' }],
})
