import { Types } from 'mongoose'

export interface IVehicle {
  _id?: Types.ObjectId
  numberPlate: string
  model: string
  year: string
}
