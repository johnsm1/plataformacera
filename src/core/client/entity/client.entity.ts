import { Types } from 'mongoose'

export interface IClient {
  _id?: Types.ObjectId
  name: string
  contactInfo: string
}
