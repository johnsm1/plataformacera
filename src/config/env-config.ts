interface Config {
  JWT_SECRET: string
  JWT_REFRESH_SECRET: string
  ACCESS_TOKEN_EXPIRY: number
  REFRESH_TOKEN_EXPIRY: number
  MONGO_USERNAME: string
  MONGO_PASSWORD: string
  MONGO_HOST: string
  MONGO_PORT: number
  SERVER_PORT: number
}

const config: Config = {
  JWT_SECRET: process.env.JWT_SECRET || 'defaultAccessTokenSecret',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || 'defaultRefreshTokenSecret',
  ACCESS_TOKEN_EXPIRY: parseInt(process.env.ACCESS_TOKEN_EXPIRY || '1800', 10),
  REFRESH_TOKEN_EXPIRY: parseInt(
    process.env.REFRESH_TOKEN_EXPIRY || '604800',
    10
  ),
  MONGO_USERNAME: process.env.MONGO_USERNAME || 'admin',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'secret',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: parseInt(process.env.MONGO_PORT || '27017', 10),
  SERVER_PORT: parseInt(process.env.SERVER_PORT || '3000', 10),
}

export default config
