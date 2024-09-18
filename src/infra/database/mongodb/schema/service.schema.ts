import { IService } from '@/core/service/entity/service.entity'
import { ServiceStatus } from '@/core/service/enum/service-status.enum'
import { Schema, Types } from 'mongoose'
import { timestampPlugin } from '@/infra/database/mongodb/plugin'

export interface IServiceDocument extends IService, Document {}

export const serviceSchema: Schema<IService> = new Schema({
  description: { type: String, required: true },
  completionDate: { type: Date, required: true },
  vehicle: { type: Types.ObjectId, ref: 'Vehicle', required: true },
  customer: { type: Types.ObjectId, ref: 'Customer', required: true },
  status: {
    type: String,
    enum: Object.values(ServiceStatus),
    required: true,
  },
  value: { type: Number, required: true },
})

serviceSchema.plugin(timestampPlugin)
