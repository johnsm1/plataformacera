import { model } from 'mongoose'

import { User } from '@/user/entity/user.entity'
import { UserSchema } from '@/infra/database/schema'

export const UserModel = model<User>('User', UserSchema, 'user')
