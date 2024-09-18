import { CustomerRepository } from '@/infra/database/mongodb/repository'
import { SaveCustomerUseCase } from '@/core/customer/use-case'

export class SaveCustomerUseCaseFactory {
  public static create(): SaveCustomerUseCase {
    const customerRepository = new CustomerRepository()
    return new SaveCustomerUseCase(customerRepository)
  }
}
