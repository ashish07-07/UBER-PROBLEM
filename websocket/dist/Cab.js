"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log(`Driver ${driverId} sent data:`, message);
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
