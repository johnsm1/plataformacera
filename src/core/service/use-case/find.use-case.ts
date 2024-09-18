import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import ClientFacade from '@/facade/client.facade'
import VehicleFacade from '@/facade/vehicle.facade'
import ServiceFacade from '@/facade/service.facade'

export class FindUseCase implements UseCase<string, ServiceResponseDTO> {
  constructor(
    private serviceFacade: ServiceFacade,
    private clientFacade: ClientFacade,
    private vehicleFacade: VehicleFacade
  ) {
    this.serviceFacade = serviceFacade
    this.clientFacade = clientFacade
    this.vehicleFacade = vehicleFacade
  }
  async execute(): Promise<ServiceResponseDTO> {
    // const { client, dateService, description, status, value, vehicle, _id } =
    //   await this.serviceFacade.findById(id)

    // const [savedClient, savedVehicle] = await Promise.all([
    //   this.clientFacade.getClient(String(client)),
    //   this.vehicleFacade.getVehicleFacade(String(vehicle)),
    // ])

    // const serviceResponseDTO: ServiceResponseDTO = {
    //   id: _id,
    //   client: savedClient,
    //   vehicle: savedVehicle,
    //   status,
    //   value,
    //   description,
    //   dateService,
    // }
    // return serviceResponseDTO

    throw new Error('Metod not implemented')
  }
}
