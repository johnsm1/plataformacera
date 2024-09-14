import * as express from 'express'
import type { Application } from 'express'
import { setupRoutes } from '@/config/routes'
import { globalErrorHandlerMiddlerware } from '@/middlewares/global-error-handler.middleware'
import { setupMiddeware } from '@/config/middleware'

export function setupApp(): Application {
  const app = express()

  setupMiddeware(app)
  setupRoutes(app)

  app.use(globalErrorHandlerMiddlerware)

  return app
}
