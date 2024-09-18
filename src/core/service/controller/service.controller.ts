import { plainToClass } from 'class-transformer'
import { SaveServiceWithExistingEntitiesUseCase } from '@/core/service/use-case'
import { Request, Response } from 'express'
import { validateDto } from '@/common/validator/validate-error'
import { SaveServiceWithExistingEntitiesInputDto } from '@/core/service/dto'

export class ServiceController {
  constructor(
    private saveServiceWithExistingEntitiesUseCase: SaveServiceWithExistingEntitiesUseCase
  ) {
    this.saveServiceWithExistingEntitiesUseCase =
      saveServiceWithExistingEntitiesUseCase
  }

  async save(req: Request, res: Response) {
    const saveServiceWithExistingEntitiesInputDto = plainToClass(
      SaveServiceWithExistingEntitiesInputDto,
      req.body
    )

    await validateDto(saveServiceWithExistingEntitiesInputDto)

    const newService =
      await this.saveServiceWithExistingEntitiesUseCase.execute(
        saveServiceWithExistingEntitiesInputDto
      )

    res.status(201).json(newService)
  }
}
