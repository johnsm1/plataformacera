import 'module-alias/register'

import * as dotenv from 'dotenv'

import { logger } from '@/config/logger'
import { setupApp } from '@/config/app'

dotenv.config()

const app = setupApp()
const port = process.env.PORT || 3000

app.listen(port, () => {
  logger.info(`Server is Fire at http://localhost:${port}`)
})
