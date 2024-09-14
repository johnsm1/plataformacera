import * as express from 'express'
import type { Express } from 'express'

import { contentType } from '@/middlewares/content-type.middleware'

export function setupMiddeware(app: Express) {
  app.use(express.json())
  app.use(contentType)
}
