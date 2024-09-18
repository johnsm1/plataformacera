import ClientFacade from '@/facade/client.facade'
import ServiceFacade from '@/facade/service.facade'
import VehicleFacade from '@/facade/vehicle.facade'
import { CreateUseCase } from '@/service/use-case'

export function makeCreateUseCase(): CreateUseCase {
  const vehicleFacade = VehicleFacade.makeVehicleFacade()
  const clientFacade = ClientFacade.makeClientFacade()
  const serviceFacade = ServiceFacade.makeServiceFacade()
  return new CreateUseCase(serviceFacade, clientFacade, vehicleFacade)
}
