import { IVehicle } from '@/core/vehicle/entity'
import { SaveServiceWithExistingEntitiesInputDto } from '@/core/service/dto'
import { IService } from '@/core/service/entity'
import { ICustomer } from '@/core/customer/entity'
import { ServiceStatus } from '@/core/service/enum'

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
      status: ServiceStatus.PENDING,
      value: dto.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    return entity
  }
}
