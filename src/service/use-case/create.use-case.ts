/* eslint-disable */
import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceRequestDTO } from '../dto/service-request.dto'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import {
  ClientRepository,
  ServiceRepository,
  VehicleRepository,
} from '@/infra/database/repository'
import { IService } from '../entity/service.entity'
import { returnMessageErrors } from '@/common/helper/error-message-map'
import { validate } from 'class-validator'
import { validateDto } from '@/common/validator/validate-error'
import ClientFacade from '@/facade/client.facade'
import VehicleFacade from '@/facade/vehicle.facade'

export class CreateUseCase
  implements UseCase<ServiceRequestDTO, ServiceResponseDTO>
{
  constructor(
    private serviceRepository: ServiceRepository,
    private clientFacade: ClientFacade,
    private vehicleFacade: VehicleFacade
  ) {
    this.clientFacade = clientFacade
    this.vehicleFacade = vehicleFacade
    this.serviceRepository = serviceRepository
  }
  async execute(input: ServiceRequestDTO): Promise<ServiceResponseDTO> {
    const { client, vehicle, description, status, dateService, value } = input
    validateDto(input)

    const [savedClient, savedVehicle] = await Promise.all([
      this.clientFacade.save(client),
      this.vehicleFacade.save(vehicle),
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
    console.log(savedService)

    return new ServiceResponseDTO(savedService._id)
  }
}
