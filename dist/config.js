"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
dotenv_1.config({
    path: isProd ? './secrets/.env.prod' : './secrets/.env.dev'
});
const mongoConfig = {
    url: `mongodb://${process.env.MONGO_IP}:27017`,
    options: { useUnifiedTopology: true },
    db: 'CAH',
};
exports.mongoConfig = mongoConfig;
const redisConfig = {
    host: process.env.REDIS_IP,
    port: 6379,
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
};
exports.redisConfig = redisConfig;
//# sourceMappingURL=config.js.map