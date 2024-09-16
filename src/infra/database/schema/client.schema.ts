import { IClient } from '@/client/entity/client.entity'
import { Schema } from 'mongoose'

export const ClientSchema: Schema<IClient> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
