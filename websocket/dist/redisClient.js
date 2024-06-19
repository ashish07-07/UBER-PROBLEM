"use strict";
// import Redis from "ioredis";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default({
    host: "localhost",
    port: 6379,
    // Add more configuration options as needed
});
exports.default = redisClient;
