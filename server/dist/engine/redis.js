import { createClient } from "redis";
import RedisStore from "connect-redis";
const redisClient = createClient();
redisClient.on('error', (err) => {
    console.log(`Could not establish a connection with redis ${err}`);
});
redisClient.on('connect', (error) => {
    console.log('Connected to redis successfully');
});
redisClient.connect();
export let redisStore = new RedisStore({
    client: redisClient,
});
//# sourceMappingURL=redis.js.map