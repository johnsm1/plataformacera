import { ICustomer } from '@/core/customer/entity/customer.entity'
import { SaveCustomerInputDto } from '@/core/customer/dto/customer.dto'

export class CustomerMapper {
  public static mapToEntity(dto: SaveCustomerInputDto): ICustomer {
    const { name } = dto
    const entity: ICustomer = {
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    return entity
  }
}
