import { IVehicle } from '@/core/vehicle/entity/vehicle.entity'
import { Schema } from 'mongoose'
export interface IVehicleDocument extends IVehicle, Document {}
export const VehicleSchema: Schema<IVehicleDocument> = new Schema(
  {
    numberPlate: { type: String, required: true },
    year: { type: String, required: true },
    model: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
