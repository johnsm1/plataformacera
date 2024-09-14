import * as express from 'express'
import type { Application } from 'express'
import { setupRoutes } from '@/config/routes'

export function setupApp(): Application {
  const app = express()

  setupRoutes(app)

  return app
}
