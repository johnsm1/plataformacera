import { Router } from 'express'
import type { Request, Response } from 'express'

export default (router: Router): void => {
  router.get('/health', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server')
  })
}
