import { model } from 'mongoose'

import { IVehicleDocument, VehicleSchema } from '../schema/vehicle.schema'

export const VehicleModel = model<IVehicleDocument>('Vehicle', VehicleSchema)
