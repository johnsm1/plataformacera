import { logger } from '@/config/logger'
import { connect, Mongoose } from 'mongoose'

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
      const username = process.env.MONGO_USERNAME
      const password = process.env.MONGO_PASSWORD
      const host = process.env.MONGO_HOST
      const port = process.env.MONGO_PORT

      const uri = `mongodb://${username}:${password}@${host}:${port}`

      Mongo.conn = await connect(uri)
      logger.info('Connected to MongoDB')
    } else {
      logger.info('Already connected to MongoDB')
    }
  }
}
