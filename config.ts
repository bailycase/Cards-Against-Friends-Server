import { config } from 'dotenv'

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

config({
  path: isProd ? './secrets/.env.prod' : './secrets/.env.dev'
})

const mongoConfig = {
  url: `mongodb://${process.env.MONGO_IP}:27017`,
  options: { useUnifiedTopology: true },
  db: 'CAH',
}

const redisConfig = {
  host: process.env.REDIS_IP,
  port: 6379,
  retryStrategy: (times: any) => {
    return Math.min(times * 50, 2000);
  },
}


export { redisConfig, mongoConfig }