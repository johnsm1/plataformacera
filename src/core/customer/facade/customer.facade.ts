import {
  FindCustomerByIdUseCase,
  SaveCustomerUseCase,
} from '@/core/customer/use-case'
import {
  SaveCustomerInputDto,
  SaveCustomerOutputDto,
} from '@/core/customer/dto'

export class CustomerFacade {
  public constructor(
    private saveCustomerUseCase: SaveCustomerUseCase,
    private findCustomerByIdUseCase: FindCustomerByIdUseCase
  ) {
    this.saveCustomerUseCase = saveCustomerUseCase
    this.findCustomerByIdUseCase = findCustomerByIdUseCase
  }

  public async save(
    input: SaveCustomerInputDto
  ): Promise<SaveCustomerOutputDto> {
    return await this.saveCustomerUseCase.execute(input)
  }

  public async findById(id: string): Promise<SaveCustomerOutputDto> {
    return await this.findCustomerByIdUseCase.execute(id)
  }
}
