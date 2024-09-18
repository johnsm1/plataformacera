import { ICustomer } from '@/core/customer/entity/customer.entity'
import { CustomerDto } from '@/core/customer/dto/customer.dto'

export class CustomerMapper {
  public static mapToEntity(dto: CustomerDto): ICustomer {
    const entity: ICustomer = {
      id: dto.id,
      name: dto.name,
    }

    return entity
  }

  public static mapToDto(entity: ICustomer): CustomerDto {
    const dto: CustomerDto = {
      id: entity.id,
      name: entity.name,
    }

    return dto
  }
}
