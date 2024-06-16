import http from "http";
import express from "express";

import { WebSocketServer } from "ws";

const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on("connection", function (ws) {
  console.log("some one connected me abhi batatu rukh");

  ws.onmessage = function (message) {
    console.log("message recieved by client");
  };
});

server.listen(8080, function () {
  console.log(`server is listening on port 8080`);
});
