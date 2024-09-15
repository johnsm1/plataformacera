import { Types, Document } from 'mongoose'

export interface Role extends Document {
  _id: Types.ObjectId
  name: string
  permissions: string[]
}
