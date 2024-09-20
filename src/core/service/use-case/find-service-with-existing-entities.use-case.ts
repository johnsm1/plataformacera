import { CustomerFacade } from '@/core/customer/facade'
import { VehicleFacade } from '@/core/vehicle/facade'
import { ServiceRepository } from '@/infra/database/mongodb/repository'
import { ServiceMapper } from '@/core/service/mapper/service.mapper'
import { ServiceDto } from '@/core/service/dto'
import { HttpException } from '@/common/exception/http-exception.error'
import { logger } from '@/config/logger'

export class FindServiceWithExistingUseCase {
  public constructor(
    private customerFacade: CustomerFacade,
    private vehicleFacade: VehicleFacade,
    private serviceRepository: ServiceRepository
  ) {
    this.serviceRepository = serviceRepository
    this.customerFacade = customerFacade
    this.vehicleFacade = vehicleFacade
  }

  public async execute(id: string): Promise<ServiceDto> {
    const service = await this.serviceRepository.findById(id)

    if (!service) {
      throw new HttpException('Service not found', 404)
    }

    const customerPromise = this.customerFacade
      .findById(service.customer.toString())
      .catch((error) => {
        logger.error(error)
        return null
      })

    const vehiclePromise = this.vehicleFacade
      .findById(service.vehicle.toString())
      .catch((error) => {
        logger.error(error)
        return null
      })

    const [customer, vehicle] = await Promise.all([
      customerPromise,
      vehiclePromise,
    ])

    if (!customer) {
      throw new HttpException('Customer not found', 404)
    }

    if (!vehicle) {
      throw new HttpException('Vehicle not found', 404)
    }

    return ServiceMapper.mapEntityToDto(service, vehicle, customer)
  }
}
