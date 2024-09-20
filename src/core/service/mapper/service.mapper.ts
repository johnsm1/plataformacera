import { IVehicle } from '@/core/vehicle/entity'
import {
  SaveServiceWithExistingEntitiesInputDto,
  ServiceDto,
} from '@/core/service/dto'
import { IService } from '@/core/service/entity'
import { ICustomer } from '@/core/customer/entity'

export class ServiceMapper {
  public static mapToEntity(
    dto: SaveServiceWithExistingEntitiesInputDto,
    vehicle: IVehicle,
    customer: ICustomer
  ): IService {
    const entity: IService = {
      description: dto.description,
      completionDate: new Date(),
      vehicle: vehicle,
      customer: customer,
      status: dto.status,
      value: dto.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    return entity
  }

  public static mapEntityToDto(
    entity: IService,
    vehicle: IVehicle,
    customer: ICustomer
  ): ServiceDto {
    const serviceDto: ServiceDto = {
      description: entity.description,
      completionDate: entity.completionDate,
      vehicle: vehicle,
      customer: customer,
      status: entity.status,
      value: entity.value,
    }
    return serviceDto
  }
}
