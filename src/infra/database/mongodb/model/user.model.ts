import { model } from 'mongoose'

import { IUser } from '@/core/user/entity/user.entity'
import { UserSchema } from '@/infra/database/mongodb/schema'

export const UserModel = model<IUser>('User', UserSchema, 'user')
