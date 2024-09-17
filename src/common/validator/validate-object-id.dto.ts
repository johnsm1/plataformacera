import mongoose from 'mongoose'
import { HttpException } from '../exception/http-exception.error'

export function validateId(id: string): void {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException('Invalid ID format', 400)
  }
}
