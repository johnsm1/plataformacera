import { CustomerRepository } from '@/infra/database/mongodb/repository'
import { FindCustomerByIdUseCase } from '@/core/customer/use-case'

export class FindCustomerByIdUseCaseFactory {
  public static create(): FindCustomerByIdUseCase {
    const customerRepository = new CustomerRepository()

    return new FindCustomerByIdUseCase(customerRepository)
  }
}
