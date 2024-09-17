import { HttpException } from '../exception/http-exception.error'
import { returnMessageErrors } from '../helper/error-message-map'
import { validate } from 'class-validator'

export async function validateDto<T extends object>(dto: T): Promise<void> {
  const errors = await validate(dto)

  if (errors.length > 0) {
    const messages = returnMessageErrors(errors)

    if (messages) {
      throw new HttpException(messages, 400)
    }
  }
}
