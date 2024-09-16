import { IVehicle } from '@/vehicle/entity/vehicle.entity'
import { Schema } from 'mongoose'

export const VehicleSchema: Schema<IVehicle> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    numberPlate: { type: String, required: true },
    year: { type: String, required: true },
    model: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
