import { validateDto } from '@/common/validator/validate-error'
import { plainToClass, instanceToPlain } from 'class-transformer'
import { NextFunction } from 'express'

export function transformDtoMiddleware<T>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoClass, req.body)

    const plainDto = instanceToPlain(dto)

    validateDto(plainDto)
    next()
  }
}
