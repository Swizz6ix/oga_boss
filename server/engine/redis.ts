import { createClient } from "redis";
import RedisStore from "connect-redis";
import { logging } from "./logging.js";

const redisClient = createClient();
redisClient.on('error', (err) => {
  console.log(`Could not establish a connection with redis ${err}`);
  logging.engineLogger.error(new Error(`Could not establish a connection with redis ${err}`))
})

redisClient.on('connect', (error) => {
  console.log('Connected to redis successfully');
  logging.engineLogger.info('Connection to redis server successful');
})

redisClient.connect()

export let redisStore = new RedisStore({
  client: redisClient,
})
