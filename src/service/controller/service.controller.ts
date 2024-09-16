/* eslint-disable */
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindByUseCase,
  FindUseCase,
  UpdateUseCase,
} from '../use-case'

export class ServiceController {
  constructor(
    private createUseCase: CreateUseCase,
    private deleteUseCase: DeleteUseCase,
    private findUseCase: FindUseCase,
    private findByUseCase: FindByUseCase,
    private findAllUseCase: FindAllUseCase,
    private updateUseCase: UpdateUseCase
  ) {
    this.createUseCase = createUseCase
    this.deleteUseCase = deleteUseCase
    this.findUseCase = findUseCase
    this.findByUseCase = findByUseCase
    this.findAllUseCase = findAllUseCase
    this.updateUseCase = updateUseCase
  }

  async create(data: any) {
    return this.createUseCase.execute(data)
  }

  async delete(id: string) {
    return this.deleteUseCase.execute(id)
  }

  async find(id: string) {
    return this.findUseCase.execute(id)
  }

  async findBy(criteria: any) {
    return this.findByUseCase.execute(criteria)
  }

  async findAll() {
    return this.findAllUseCase.execute('')
  }

  async update(id: string, data: any) {
    return this.updateUseCase.execute(id)
  }
}
