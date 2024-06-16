"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const server = http_1.default.createServer();
const wss = new ws_1.WebSocketServer({ server });
wss.on("connection", function (ws) {
    console.log("some one connected me abhi batatu rukh");
    ws.onmessage = function (message) {
        console.log("message recieved by client");
        console.log(message);
    };
});
server.listen(8080, function () {
    console.log(`server is listening on port 8080`);
});
