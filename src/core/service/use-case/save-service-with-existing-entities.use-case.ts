import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { SaveServiceWithExistingEntitiesInputDto } from '@/core/service/dto'
import { CustomerFacade } from '@/core/customer/facade'
import { HttpException } from '@/common/exception/http-exception.error'
import { VehicleFacade } from '@/core/vehicle/facade'
import { ServiceMapper } from '@/core/service/mapper'
import { IService } from '@/core/service/entity'

export class SaveServiceWithExistingEntitiesUseCase {
  public constructor(
    private serviceRepository: ServiceRepository,
    private customerFacade: CustomerFacade,
    private vehicleFacade: VehicleFacade
  ) {
    this.serviceRepository = serviceRepository
    this.customerFacade = customerFacade
    this.vehicleFacade = vehicleFacade
  }

  public async execute(
    input: SaveServiceWithExistingEntitiesInputDto
  ): Promise<IService> {
    const { customerId, vehicleId } = input
    const customer = await this.customerFacade.findById(customerId)
    if (!customer) {
      throw new HttpException(
        `Customer with ID ${customerId} was not found. Please verify the ID and try again.`,
        404
      )
    }

    const vehicle = await this.vehicleFacade.findById(vehicleId)

    if (!vehicle) {
      throw new HttpException(
        `Vehicle with ID ${vehicleId} was not found. Please verify the ID and try again.`,
        404
      )
    }

    const serviceEntity = ServiceMapper.mapToEntity(input, vehicle, customer)

    const newService = await this.serviceRepository.save(serviceEntity)

    return newService
  }
}
