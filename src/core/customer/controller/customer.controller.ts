import { Response, Request } from 'express'
import {
  FindCustomerByIdUseCase,
  SaveCustomerUseCase,
} from '@/core/customer/use-case'
import { SaveCustomerInputDto } from '@/core/customer/dto'
import { validateDto } from '@/common/validator/validate-error'
import { HttpException } from '@/common/exception/http-exception.error'

export class CustomerController {
  public constructor(
    private saveCustomerUseCase: SaveCustomerUseCase,
    private findCustomerByIdUseCase: FindCustomerByIdUseCase
  ) {
    this.saveCustomerUseCase = saveCustomerUseCase
  }

  public async save(req: Request, res: Response) {
    const saveCustomerInputDto = new SaveCustomerInputDto(req.body.name)

    await validateDto(saveCustomerInputDto)

    const newCustomer =
      await this.saveCustomerUseCase.execute(saveCustomerInputDto)

    return res.status(201).json(newCustomer)
  }

  public async findById(req: Request, res: Response) {
    const id = req.params.id

    const customer = await this.findCustomerByIdUseCase.execute(id)

    if (!customer) {
      throw new HttpException(
        `Customer with ID ${id} was not found. Please verify the ID and try again.`,
        404
      )
    }

    return res.status(200).json(customer)
  }
}
