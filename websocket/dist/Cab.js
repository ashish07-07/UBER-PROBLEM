"use strict";
// import { WebSocket } from "ws";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redisClient_1 = __importDefault(require("./redisClient"));
class ConnectionManager {
    constructor() {
        this.drivers = {};
        this.customers = {};
    }
    registerClient(client) {
        const { type, id, socket } = client;
        if (type === "driver") {
            this.drivers[id] = socket;
        }
        else if (type === "customer") {
            this.customers[id] = socket;
        }
        console.log(`${type} registered with ID: ${id}`);
    }
    unregisterClient(type, id) {
        if (type === "driver") {
            delete this.drivers[id];
        }
        else if (type === "customer") {
            delete this.customers[id];
        }
        console.log(`${type} with ID: ${id} disconnected`);
    }
    handleMessage(type, id, message) {
        if (type === "driver") {
            this.handleDriverMessage(id, message);
        }
        else if (type === "customer") {
            this.handleCustomerMessage(id, message);
        }
    }
    handleDriverMessage(driverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Driver ${driverId} sent data:`, message);
            if (message.type === "locationUpdate") {
                const latitude = message.latitude;
                const longitude = message.longitude;
                console.log(driverId);
                console.log("came here next is redis");
                try {
                    // console.log(redisClient);
                    // await redisClient.geoadd("drivers", {
                    //   longitude,
                    //   latitude,
                    //   member: driverId,
                    // });
                    // await redisClient.geoadd(
                    //   "drivers",
                    //   parseFloat(longitude),
                    //   parseFloat(latitude),
                    //   driverId
                    // );
                    yield redisClient_1.default.geoadd("drivers", parseFloat(longitude), parseFloat(latitude), driverId);
                    console.log("Location updated in Redis for driver", driverId);
                }
                catch (error) {
                    console.error("Error updating the driver location", error);
                }
            }
            else {
                console.log(`Driver ${driverId} sent an unhandled message type:`, message);
            }
        });
    }
    handleCustomerMessage(customerId, message) {
        console.log(`Customer ${customerId} sent data:`, message);
    }
    getDriverSocket(driverId) {
        return this.drivers[driverId];
    }
    getCustomerSocket(customerId) {
        return this.customers[customerId];
    }
}
exports.default = ConnectionManager;
