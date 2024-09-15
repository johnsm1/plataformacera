/* eslint-disable */
import { Router } from 'express'
import type { Express } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

export function setupRoutes(app: Express): void {
  const router = Router()

  app.use('/api', router)

  readdirSync(join(__dirname, '../routes')).map(async (file) => {
    if (!file.endsWith('.map')) {
      ;(await import(`../routes/${file}`)).default(router)
    }
  })

  app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' })
  })
}
