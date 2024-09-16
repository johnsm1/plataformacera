/* eslint-disable */
import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceRequestDTO } from '../dto/service-request.dto'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import {
  ClientRepository,
  ServiceRepository,
  VehicleRepository,
} from '@/infra/database/repository'

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
    return new ServiceResponseDTO()
  }
}
