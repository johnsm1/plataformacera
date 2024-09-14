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
      Mongo.conn = await connect('mongodb://admin:secret@localhost:27017')
      logger.info('Connected to MongoDB')
    } else {
      logger.info('Already connected to MongoDB')
    }
  }
}
