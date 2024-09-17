import ClientFacade from '@/facade/client.facade'
import VehicleFacade from '@/facade/vehicle.facade'
import { ServiceRepository } from '@/infra/database/repository'
import { CreateUseCase } from '@/service/use-case'

export function makeCreateUseCase(): CreateUseCase {
  const vehicleRepository = VehicleFacade.makeVehicleFacade()
  const clientFacade = ClientFacade.makeClientFacade()
  const serviceRepository = new ServiceRepository()
  return new CreateUseCase(serviceRepository, clientFacade, vehicleRepository)
}
