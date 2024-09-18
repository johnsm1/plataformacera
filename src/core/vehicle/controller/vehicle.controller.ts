import { validateDto } from '@/common/validator/validate-error'
import {
  FindVehicleByIdUseCase,
  SaveVehicleUseCase,
} from '@/core/vehicle/use-case'
import { Request, Response } from 'express'
import { SaveVehicleInputDto } from '@/core/vehicle/dto'
import { HttpException } from '@/common/exception/http-exception.error'

export class VehicleController {
  public constructor(
    private saveVehicleUseCase: SaveVehicleUseCase,
    private findVehicleByIdUseCase: FindVehicleByIdUseCase
  ) {
    this.saveVehicleUseCase = saveVehicleUseCase
  }

  public async save(req: Request, res: Response) {
    const saveVehicleInputDto = new SaveVehicleInputDto(
      req.body.numberPlate,
      req.body.model,
      req.body.year
    )

    await validateDto(saveVehicleInputDto)

    const newVehicle =
      await this.saveVehicleUseCase.execute(saveVehicleInputDto)

    return res.status(201).json(newVehicle)
  }

  public async findById(req: Request, res: Response) {
    const id = req.params.id

    const vehicle = await this.findVehicleByIdUseCase.execute(id)

    if (!vehicle) {
      throw new HttpException(
        `Vehicle with ID ${id} was not found. Please verify the ID and try again.`,
        404
      )
    }

    return res.status(200).json(vehicle)
  }
}
