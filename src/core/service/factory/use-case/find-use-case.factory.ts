import ClientFacade from '@/facade/client.facade'
import ServiceFacade from '@/facade/service.facade'
import VehicleFacade from '@/facade/vehicle.facade'
import { FindUseCase } from '../../use-case'

export function makeFindUseCase(): FindUseCase {
  const serviceFacade = ServiceFacade.makeServiceFacade()
  const clientFacade = ClientFacade.makeClientFacade()
  const vehicleFacade = VehicleFacade.makeVehicleFacade()
  return new FindUseCase(serviceFacade, clientFacade, vehicleFacade)
}
