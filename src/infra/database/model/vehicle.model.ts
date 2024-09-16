import { model } from 'mongoose'

import { IVehicle } from '@/vehicle/entity/vehicle.entity'
import { VehicleSchema } from '../schema/vehicle.schema'

export const VehicleModel = model<IVehicle>('Vehicle', VehicleSchema, 'vehicle')
