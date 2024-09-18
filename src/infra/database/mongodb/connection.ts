import { connect, Mongoose } from 'mongoose'

import { logger } from '@/config/logger'
import {
  RoleModel,
  UserModel,
  CustomerModel,
} from '@/infra/database/mongodb/model'
import config from '@/config/env-config'

export class Mongo {
  private static instance: Mongo | null = null
  private static conn: Mongoose | null = null

  private constructor() {}

  public static getInstance(): Mongo {
    if (!Mongo.instance) {
      Mongo.instance = new Mongo()
    }
    return Mongo.instance
  }

  public static async connect() {
    if (!Mongo.conn) {
      const username = config.MONGO_USERNAME
      const password = config.MONGO_PASSWORD
      const host = config.MONGO_HOST
      const port = config.MONGO_PORT

      const uri = `mongodb://${username}:${password}@${host}:${port}`

      Mongo.conn = await connect(uri)

      logger.info('Connected to MongoDB')
    } else {
      logger.info('Already connected to MongoDB')
    }

    await RoleModel.createCollection()
    await UserModel.createCollection()
    await CustomerModel.createCollection()
  }
}
