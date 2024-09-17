/* eslint-disable */
import { plainToClass } from 'class-transformer'
import {
  CreateUseCase,
  DeleteUseCase,
  FindAllUseCase,
  FindByUseCase,
  FindUseCase,
  UpdateUseCase,
} from '../use-case'
import { ServiceRequestDTO } from '../dto/service-request.dto'
import { Request, Response } from 'express'
import { ServiceResponseDTO } from '../dto/service-response.dto'
import mongoose from 'mongoose'
import { HttpException } from '@/common/exception/http-exception.error'
import { ServiceCriteriaDto } from '../dto/service-criteria.dto'
import { validateDto } from '@/common/validator/validate-error'
import { validateId } from '@/common/validator/validate-object-id.dto'

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

  async create(req: Request, res: Response) {
    const serviceRequestDto = plainToClass(ServiceRequestDTO, req.body)
    await validateDto(serviceRequestDto)
    const result: ServiceResponseDTO =
      await this.createUseCase.execute(serviceRequestDto)

    const locationUrl = `${req.protocol}://${req.get('host')}/api/service/${result.id}`

    return res
      .status(201)
      .location(locationUrl)
      .json({ id: result.id, url: locationUrl })
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id
    validateId(id)
    const result = await this.deleteUseCase.execute(id)

    if (!result) {
      throw new HttpException('Resource Not Found', 404)
    }

    return res.json('Resource deleted successfully')
  }

  async find(req: Request, res: Response) {
    const id = req.params.id
    validateId(id)
    return res.json(await this.findUseCase.execute(id)).sendStatus(200)
  }

  async findBy(req: Request, res: Response) {
    const serviceCriteriaDto = plainToClass(ServiceCriteriaDto, req.query)
    await validateDto(serviceCriteriaDto)

    return res
      .json(await this.findByUseCase.execute(serviceCriteriaDto))
      .status(200)
  }

  async findAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    return res
      .json(await this.findAllUseCase.execute({ page, limit }))
      .status(200)
  }

  async update(id: string, data: any) {
    return this.updateUseCase.execute(id)
  }
}
