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
    }
    unregisterClient(type, id) {
        if (type === "driver") {
            delete this.drivers[id];
        }
        else if (type === "customer") {
            delete this.customers[id];
        }
    }
    handleMessage(clientType, clientId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (clientType === "driver") {
                yield this.handleDriverMessage(clientId, message);
            }
            else if (clientType === "customer") {
                yield this.handleCustomerMessage(clientId, message);
            }
        });
    }
    handleDriverMessage(driverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.type === "locationUpdate") {
                const { lat, lng } = message.location;
                yield redisClient_1.default.geoadd("drivers", lng, lat, driverId);
            }
        });
    }
    handleCustomerMessage(customerId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.type === "locationUpdate") {
                const { from, to, distance } = message;
                console.log(message);
                console.log(`driver with id ${customerId} sent the message ${message}`);
                yield redisClient_1.default.geoadd("customers", from.lng, from.lat, customerId);
                yield redisClient_1.default.geoadd("customers", to.lng, to.lat, `${customerId}:to`);
                yield redisClient_1.default.set(`distance:${customerId}`, JSON.stringify(distance), "EX", 3600);
                yield this.calculateCustomerDensity(customerId, from);
            }
            else if (message.type === "requestDensity") {
                const { lat, lng } = message.location;
                const density = yield this.calculateCustomerDensity(customerId, {
                    lat,
                    lng,
                });
                const customerSocket = this.customers[customerId];
                if (customerSocket) {
                    customerSocket.send(JSON.stringify({ type: "densityResult", density }));
                }
            }
        });
    }
    calculateCustomerDensity(customerId, location) {
        return __awaiter(this, void 0, void 0, function* () {
            const radius = 4; // Radius in kilometers
            const nearbyCustomers = yield redisClient_1.default.georadius("customers", location.lng, location.lat, radius, "km");
            const density = nearbyCustomers.length;
            return density;
        });
    }
}
exports.default = ConnectionManager;
