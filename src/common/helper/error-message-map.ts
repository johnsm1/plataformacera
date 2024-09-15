import { ValidationError } from 'class-validator'

export function returnMessageErrors(errors: ValidationError[]) {
  if (errors.length > 0) {
    return errors.map((error) => Object.values(error.constraints!).join(', '))
  }
  return null
}
