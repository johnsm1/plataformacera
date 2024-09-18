import {
  FindCustomerByIdUseCase,
  SaveCustomerUseCase,
} from '@/core/customer/use-case'
import { SaveCustomerInputDto } from '@/core/customer/dto'
import { ICustomer } from '@/core/customer/entity'
import { CustomerRepository } from '@/infra/database/mongodb/repository'

export class CustomerFacade {
  private saveCustomerUseCase: SaveCustomerUseCase
  private findCustomerByIdUseCase: FindCustomerByIdUseCase

  public constructor() {
    const customerRepository = new CustomerRepository()
    this.saveCustomerUseCase = new SaveCustomerUseCase(customerRepository)
    this.findCustomerByIdUseCase = new FindCustomerByIdUseCase(
      customerRepository
    )
  }

  public async save(input: SaveCustomerInputDto): Promise<ICustomer> {
    return await this.saveCustomerUseCase.execute(input)
  }

  public async findById(id: string): Promise<ICustomer> {
    return await this.findCustomerByIdUseCase.execute(id)
  }
}
