import { CustomerRepository } from '@/infra/database/mongodb/repository'
import { SaveCustomerInputDto } from '@/core/customer/dto'
import { CustomerMapper } from '@/core/customer/mapper'
import { ICustomer } from '@/core/customer/entity'

export class SaveCustomerUseCase {
  public constructor(private customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public async execute(input: SaveCustomerInputDto): Promise<ICustomer> {
    return await this.customerRepository.save(CustomerMapper.mapToEntity(input))
  }
}
