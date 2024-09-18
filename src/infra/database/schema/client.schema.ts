import { IClient } from '@/core/client/entity/client.entity'
import { Schema } from 'mongoose'
export interface IClientDocument extends IClient, Document {}
export const ClientSchema: Schema<IClientDocument> = new Schema(
  {
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
