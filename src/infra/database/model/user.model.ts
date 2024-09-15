import { model } from 'mongoose'

import { IUser } from '@/user/entity/user.entity'
import { UserSchema } from '@/infra/database/schema'

export const UserModel = model<IUser>('User', UserSchema, 'user')
