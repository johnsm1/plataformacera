import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceRequestDTO } from '../dto/service-request.dto'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import { IService } from '../entity/service.entity'
import { validateDto } from '@/common/validator/validate-error'
import ClientFacade from '@/facade/client.facade'
import VehicleFacade from '@/facade/vehicle.facade'
import ServiceFacade from '@/facade/service.facade'

export class CreateUseCase
  implements UseCase<ServiceRequestDTO, ServiceResponseDTO>
{
  constructor(
    private serviceFacade: ServiceFacade,
    private clientFacade: ClientFacade,
    private vehicleFacade: VehicleFacade
  ) {
    this.clientFacade = clientFacade
    this.vehicleFacade = vehicleFacade
    this.serviceFacade = serviceFacade
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
    const savedService = await this.serviceFacade.save(newService)
    console.log(savedService)

    return new ServiceResponseDTO(savedService._id)
  }
}
