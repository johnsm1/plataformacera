export class HttpException extends Error {
  statusCode: number
  description: string
  errors: string | string[]

  constructor(
    errors: string | string[],
    statusCode: number,
    description?: string
  ) {
    super()
    this.statusCode = statusCode
    this.errors = errors
    this.description = description ?? ''
  }
}
