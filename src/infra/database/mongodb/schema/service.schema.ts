import { IService } from '@/service/entity/service.entity'
import { ServiceStatus } from '@/service/enum/service-status.enum'
import { Schema } from 'mongoose'
export interface IServiceDocument extends IService, Document {}
export const ServiceSchema: Schema<IServiceDocument> = new Schema(
  {
    description: { type: String, required: true },
    dateService: { type: Date, required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    status: {
      type: String,
      enum: Object.values(ServiceStatus),
      required: true,
    },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)
