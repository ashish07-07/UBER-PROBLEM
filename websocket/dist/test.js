"use strict";
// import { WebSocket } from "ws";
// import redisClient from "./redisClient";
// import { error } from "console";
// interface Client {
//   type: "driver" | "customer";
//   id: string;
//   socket: WebSocket;
// }
// class ConnectionManager {
//   private drivers: { [key: string]: WebSocket } = {};
//   private customers: { [key: string]: WebSocket } = {};
//   registerClient(client: Client): void {
//     const { type, id, socket } = client;
//     if (type === "driver") {
//       this.drivers[id] = socket;
//     } else if (type === "customer") {
//       this.customers[id] = socket;
//     }
//     console.log(`${type} registered with ID: ${id}`);
//   }
//   unregisterClient(type: "driver" | "customer", id: string): void {
//     if (type === "driver") {
//       delete this.drivers[id];
//     } else if (type === "customer") {
//       delete this.customers[id];
//     }
//     console.log(`${type} with ID: ${id} disconnected`);
//   }
//   handleMessage(type: "driver" | "customer", id: string, message: any): void {
//     if (type === "driver") {
//       this.handleDriverMessage(id, message);
//     } else if (type === "customer") {
//       this.handleCustomerMessage(id, message);
//     }
//   }
//   private async handleDriverMessage(
//     driverId: string,
//     message: any
//   ): Promise<void> {
//     console.log(`Driver ${driverId} sent data:`, message);
//     if (message.type === "locationUpdate") {
//       const latitude = message.latitude;
//       const longitude = message.longitude;
//       try {
//         await redisClient.geoadd("driver", latitude, longitude);
//       } catch (error) {
//         console.error("error updating the driver location");
//       }
//     } else {
//       console.log(`driver ${driverId} sent the data`, message);
//     }
//   }
//   private handleCustomerMessage(customerId: string, message: any): void {
//     console.log(`Customer ${customerId} sent data:`, message);
//   }
//   getDriverSocket(driverId: string): WebSocket | undefined {
//     return this.drivers[driverId];
//   }
//   getCustomerSocket(customerId: string): WebSocket | undefined {
//     return this.customers[customerId];
//   }
// }
// export default ConnectionManager;
