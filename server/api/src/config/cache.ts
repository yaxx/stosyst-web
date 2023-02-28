import { RedisOptions } from "ioredis"

const {
    REDIS_HOST = 'redis-18097.c261.us-east-1-4.ec2.cloud.redislabs.com',
    REDIS_PORT = 18097,
    REDIS_PASSWORD = 'secret'
} = process.env

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD
}