import { Router } from 'express'
import { controllerAdapter } from '@/common/adapter/controller-adapater'
import { VehicleControllerFactory } from '@/core/vehicle/factory'

export default (router: Router): void => {
  const vehicleController = VehicleControllerFactory.create()

  router.post('/vehicles', controllerAdapter(vehicleController, 'save'))
  router.get('/vehicles/:id', controllerAdapter(vehicleController, 'findById'))
}
