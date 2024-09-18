import { IsNotEmpty } from 'class-validator'

export class CustomerDto {
  id?: string
  name: string
}

export class SaveCustomerInputDto {
  @IsNotEmpty()
  name: string

  constructor(name: string) {
    this.name = name
  }
}

export class SaveCustomerOutputDto {
  name: string
}
