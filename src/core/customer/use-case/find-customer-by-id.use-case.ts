import { CustomerRepository } from '@/infra/database/mongodb/repository'
import { ICustomer } from '@/core/customer/entity'

export class FindCustomerByIdUseCase {
  public constructor(private customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  public async execute(customerId: string): Promise<ICustomer | undefined> {
    return await this.customerRepository.findById(customerId)
  }
}
