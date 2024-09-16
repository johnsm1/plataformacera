import { HttpException } from '@/common/exception/http-exception.error'
import { returnMessageErrors } from '@/common/helper/error-message-map'
import { plainToClass, instanceToPlain } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { NextFunction } from 'express'

export function transformDtoMiddleware<T>(dtoClass: new () => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoClass, req.body)

    const plainDto = instanceToPlain(dto)

    const errors: ValidationError[] = await validate(plainDto as object)
    const messages = returnMessageErrors(errors)

    if (errors.length > 0) {
      throw new HttpException(messages, 400)
    }
    next()
  }
}
