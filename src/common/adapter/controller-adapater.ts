/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

export const controllerAdapter =
  (controller: any, method: keyof typeof controller) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller[method].bind(controller)(req, res)
    } catch (error) {
      next(error)
    }
  }
