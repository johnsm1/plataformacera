/* eslint-disable */
import { UseCase } from '@/common/usecase/use-case.interface'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import { ServiceRepository } from '@/infra/database/repository'
import mongoose from 'mongoose'
import ClientFacade from '@/facade/client.facade'
import VehicleFacade from '@/facade/vehicle.facade'

export class FindUseCase implements UseCase<string, ServiceResponseDTO> {
  constructor(
    private serviceRepository: ServiceRepository,
    private clientFacade: ClientFacade,
    private vehicleFacade: VehicleFacade
  ) {
    this.serviceRepository = serviceRepository
    this.clientFacade = clientFacade
    this.vehicleFacade = vehicleFacade
  }
  async execute(id: string): Promise<ServiceResponseDTO> {
    const { client, dateService, description, status, value, vehicle, _id } =
      await this.serviceRepository.findById(id)

    const [savedClient, savedVehicle] = await Promise.all([
      this.clientFacade.getClientFacade(String(client)),
      this.vehicleFacade.getVehicleFacade(String(vehicle)),
    ])

    console.log(savedVehicle)

    const serviceResponseDTO: ServiceResponseDTO = {
      id: _id,
      client: savedClient,
      vehicle: savedVehicle,
      status,
      value,
      description,
      dateService,
    }
    return serviceResponseDTO
  }
}
