/* eslint-disable */
import { Router } from 'express'
import type { Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../swagger.config'

export function setupRoutes(app: Express): void {
  const router = Router()
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

  app.use('/', router)
  readdirSync(join(__dirname, '../routes')).map(async (file) => {
    if (!file.endsWith('.map')) {
      ;(await import(`../routes/${file}`)).default(router)
    }
  })

  app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' })
  })
}
