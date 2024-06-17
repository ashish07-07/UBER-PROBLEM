"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const Cab_1 = __importDefault(require("./Cab"));
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
const connectionManager = new Cab_1.default();
wss.on("connection", (ws) => {
    let clientType;
    let clientId;
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type === "register") {
            clientType = data.clientType;
            clientId = data.clientId;
            if (clientType && clientId) {
                connectionManager.registerClient({
                    type: clientType,
                    id: clientId,
                    socket: ws,
                });
            }
            return;
        }
        if (clientType && clientId) {
            connectionManager.handleMessage(clientType, clientId, data);
        }
    });
    ws.on("close", () => {
        if (clientType && clientId) {
            connectionManager.unregisterClient(clientType, clientId);
        }
    });
});
server.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
