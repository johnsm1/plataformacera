import { CustomerRepository } from '@/infra/database/mongodb/repository'
import {
  SaveCustomerInputDto,
  SaveCustomerOutputDto,
} from '@/core/customer/dto'
import { CustomerMapper } from '@/core/customer/mapper'

export class SaveCustomerUseCase {
  public constructor(private customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public async execute(
    input: SaveCustomerInputDto
  ): Promise<SaveCustomerOutputDto> {
    return await this.customerRepository.save(CustomerMapper.mapToEntity(input))
  }
}
