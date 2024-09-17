import mongoose from 'mongoose'

export function returnObjectId(id: string) {
  return new mongoose.Types.ObjectId(id)
}
