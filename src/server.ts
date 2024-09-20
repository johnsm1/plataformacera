import 'reflect-metadata'
import 'module-alias/register'
import * as dotenv from 'dotenv'

import { logger } from '@/config/logger'
import { setupApp } from '@/config/app'
import { Mongo } from '@/infra/database/mongodb/connection'

dotenv.config()

const app = setupApp()
const port = process.env.PORT || 3000

Mongo.connect()
  .then(() => {
    app.listen(port, () => {
      logger.info(
        `Swagger Docs are available at http://localhost:${port}/api-docs`
      )
      logger.info(`Server is Fire at http://localhost:${port}`)
    })
  })
  .catch((error) => {
    logger.error('Database connection failed', error)
  })
