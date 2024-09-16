import { IService } from '@/service/entity/service.entity'
import { ServiceStatus } from '@/service/enum/service-status.enum'
import { Schema } from 'mongoose'

export const ServiceSchema: Schema<IService> = new Schema(
  {
    serviceId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
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
