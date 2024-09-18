import { model } from 'mongoose'
import { vehicleSchema } from '@/infra/database/mongodb/schema'
import { IVehicle } from '@/core/vehicle/entity'

export const VehicleModel = model<IVehicle>(
  'Vehicle',
  vehicleSchema,
  'vehicles'
)
