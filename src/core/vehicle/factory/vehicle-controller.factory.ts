import { VehicleController } from '@/core/vehicle/controller'
import {
  SaveVehicleUseCaseFactory,
  FindVehicleByIdUseCaseFactory,
} from '@/core/vehicle/factory'

export class VehicleControllerFactory {
  public static create(): VehicleController {
    return new VehicleController(
      SaveVehicleUseCaseFactory.create(),
      FindVehicleByIdUseCaseFactory.create()
    )
  }
}
