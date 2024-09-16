import {
  ClientRepository,
  ServiceRepository,
  VehicleRepository,
} from '@/infra/database/repository'
import { CreateUseCase } from '@/service/use-case'

export function makeCreateUseCase(): CreateUseCase {
  const clientRepository = new ClientRepository()
  const vehicleRepository = new VehicleRepository()
  const serviceRepository = new ServiceRepository()
  return new CreateUseCase(
    clientRepository,
    vehicleRepository,
    serviceRepository
  )
}
