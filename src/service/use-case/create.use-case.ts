/* eslint-disable */
import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceRequestDTO } from '../dto/service-request.dto'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import {
  ClientRepository,
  ServiceRepository,
  VehicleRepository,
} from '@/infra/database/repository'
import { IClient } from '@/client/entity/client.entity'
import { IVehicle } from '@/vehicle/entity/vehicle.entity'
import { IService } from '../entity/service.entity'

export class CreateUseCase
  implements UseCase<ServiceRequestDTO, ServiceResponseDTO>
{
  constructor(
    private clientRepository: ClientRepository,
    private vehicleRepository: VehicleRepository,
    private serviceRepository: ServiceRepository
  ) {
    this.clientRepository = clientRepository
    this.vehicleRepository = vehicleRepository
    this.serviceRepository = serviceRepository
  }
  async execute(input: ServiceRequestDTO): Promise<ServiceResponseDTO> {
    const { client, vehicle, description, status, dateService, value } = input

    const [savedClient, savedVehicle] = await Promise.all([
      this.clientRepository.save(client),
      this.vehicleRepository.save(vehicle),
    ])

    const newService: IService = {
      client: savedClient._id,
      vehicle: savedVehicle._id,
      description,
      value,
      status,
      dateService,
    }
    const savedService = await this.serviceRepository.save(newService)

    return new ServiceResponseDTO(savedService._id)
  }
}
