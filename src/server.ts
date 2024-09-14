import 'module-alias/register'

import * as express from 'express'
import * as dotenv from 'dotenv'
import type { Request, Response, Application } from 'express'

import { logger } from '@/logger'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server')
})

app.listen(port, () => {
  logger.info(`Server is Fire at http://localhost:${port}`)
})
