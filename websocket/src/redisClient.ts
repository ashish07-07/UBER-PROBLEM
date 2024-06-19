// import Redis from "ioredis";

// const redis = new Redis({
//   host: "localhost",
//   port: 6379,
// });

// export default redis;

// redisClient.ts
// import { createClient } from "redis";

// const redisClient = createClient({
//   url: "redis://localhost:6379",
// });

// redisClient.on("error", (err) => console.error("Redis Client Error", err));

// redisClient.connect();

// export default redisClient;

import { createClient } from "redis";
// import redisClient from './redisClient';

// const redisClient = createClient({
//   url: "redis://localhost:6379",
// });

// redisClient.on("error", (err) => console.error("Redis Client Error", err));

// (async () => {
//   await redisClient.connect();
//   console.log("redis connected");
// })();
// const redisClient= createClient()
// export const redisClient = createClient();

// export default redisClient;
// redisClient.ts
import Redis from "ioredis";

const redisClient = new Redis({
  host: "localhost",
  port: 6379,
  // Add more configuration options as needed
});

export default redisClient;
