import ClientFacade from '@/facade/client.facade'
import VehicleFacade from '@/facade/vehicle.facade'
import { ServiceRepository } from '@/infra/database/repository'
import { FindUseCase } from '@/service/use-case'

export function makeFindUseCase(): FindUseCase {
  const serviceRepository = new ServiceRepository()
  const clientFacade = ClientFacade.makeClientFacade()
  const vehicleFacade = VehicleFacade.makeVehicleFacade()
  return new FindUseCase(serviceRepository, clientFacade, vehicleFacade)
}
