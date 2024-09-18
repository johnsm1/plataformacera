import { IVehicle } from '@/core/vehicle/entity/vehicle.entity'
import { Schema } from 'mongoose'
import { timestampPlugin } from '@/infra/database/mongodb/plugin'

export const vehicleSchema: Schema<IVehicle> = new Schema(
  {
    numberPlate: { type: String, required: true },
    year: { type: Number, required: true },
    model: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

vehicleSchema.plugin(timestampPlugin)
