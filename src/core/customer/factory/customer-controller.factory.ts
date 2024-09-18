import { CustomerController } from '@/core/customer/controller/customer.controller'
import { FindCustomerByIdUseCaseFactory } from '@/core/customer/factory'
import { SaveCustomerUseCaseFactory } from '@/core/customer/factory'

export class CustomerControllerFactory {
  public static create(): CustomerController {
    return new CustomerController(
      SaveCustomerUseCaseFactory.create(),
      FindCustomerByIdUseCaseFactory.create()
    )
  }
}
