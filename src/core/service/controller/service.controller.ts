import { plainToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { validateDto } from '@/common/validator/validate-error'
import {
  SaveServiceWithExistingEntitiesInputDto,
  ServiceFindByCriteriaDto,
  UpdateServiceDto,
} from '@/core/service/dto'
import { validateId } from '@/common/validator/validate-object-id.dto'
import { HttpException } from '@/common/exception/http-exception.error'
import { validateAllId } from '@/common/validator/validate-all-ids'
import { validateServiceStatus } from '@/core/service/validator'
import {
  DeleteServiceUseCase,
  FindAllServiceWithFiltersUseCase,
  FindServiceWithExistingUseCase,
  SaveServiceWithExistingEntitiesUseCase,
  UpdateServiceUseCase,
} from '@/core/service/use-case'

export class ServiceController {
  constructor(
    private saveServiceWithExistingEntitiesUseCase: SaveServiceWithExistingEntitiesUseCase,
    private findServiceWithExistingUseCase: FindServiceWithExistingUseCase,
    private findAllServiceWithFiltersUseCase: FindAllServiceWithFiltersUseCase,
    private deleteServiceUseCase: DeleteServiceUseCase,
    private updateServiceUseCase: UpdateServiceUseCase
  ) {
    this.saveServiceWithExistingEntitiesUseCase =
      saveServiceWithExistingEntitiesUseCase
    this.findServiceWithExistingUseCase = findServiceWithExistingUseCase
    this.findAllServiceWithFiltersUseCase = findAllServiceWithFiltersUseCase
    this.deleteServiceUseCase = deleteServiceUseCase
    this.updateServiceUseCase = updateServiceUseCase
  }

  async save(req: Request, res: Response) {
    const saveServiceWithExistingEntitiesInputDto = plainToClass(
      SaveServiceWithExistingEntitiesInputDto,
      req.body
    )

    await validateDto(saveServiceWithExistingEntitiesInputDto)

    if (saveServiceWithExistingEntitiesInputDto.status) {
      validateServiceStatus(saveServiceWithExistingEntitiesInputDto.status)
    }

    const newService =
      await this.saveServiceWithExistingEntitiesUseCase.execute(
        saveServiceWithExistingEntitiesInputDto
      )

    res.status(201).json(newService)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const updateServiceDto = plainToClass(UpdateServiceDto, req.body)

    validateAllId(id, updateServiceDto)
    validateDto(updateServiceDto)

    if (updateServiceDto.status) {
      validateServiceStatus(updateServiceDto.status)
    }

    const updateService = await this.updateServiceUseCase.execute(
      id,
      updateServiceDto
    )

    return res.json(updateService).status(200)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    validateId(id)
    const deletedService = await this.deleteServiceUseCase.execute(id)

    if (!deletedService) {
      throw new HttpException('Resource Not Found', 404)
    }

    return res.json('Resource deleted successfully')
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params
    validateId(id)
    const service = await this.findServiceWithExistingUseCase.execute(id)
    return res.status(200).json(service)
  }

  async findAllByFilter(req: Request, res: Response) {
    const serviceCriteriaDto = plainToClass(ServiceFindByCriteriaDto, req.query)
    await validateDto(serviceCriteriaDto)

    return res
      .json(
        await this.findAllServiceWithFiltersUseCase.execute(serviceCriteriaDto)
      )
      .status(200)
  }
}
