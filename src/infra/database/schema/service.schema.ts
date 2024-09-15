import { IService } from '@/service/entity/service.entity'
import { Schema } from 'mongoose'

export const serviceSchema: Schema<IService> = new Schema(
  {
    serviceId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    status: {
      type: String,
      enum: ['Pendente', 'Em Andamento', 'Concluído'],
      required: true,
    },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)
