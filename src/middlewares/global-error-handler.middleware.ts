import { HttpException } from '@/common/exception/http-exception.error'
import { NextFunction, Request, Response } from 'express'

export function globalErrorHandlerMiddlerware(
  error: HttpException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next()
  }

  if (error instanceof HttpException) {
    const statusCode = error.statusCode
    const message = error.errors
    const description = error.description

    return res.status(statusCode).json({
      success: false,
      message,
      ...(description && description.trim() !== '' && { description }),
      timestamp: new Date().getTime(),
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    description: 'Something wrong happened. Please try again soon.',
    timestamp: new Date().getTime(),
  })
}
