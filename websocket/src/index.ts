import http from "http";
import express from "express";
import { WebSocketServer, WebSocket } from "ws";

import ConnectionManager from "./Cab";

const server = http.createServer();
const wss = new WebSocketServer({ server });

const connectionManager = new ConnectionManager();

wss.on("connection", (ws: WebSocket) => {
  let clientType: "driver" | "customer" | undefined;
  let clientId: string | undefined;

  ws.on("message", (message: string) => {
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
