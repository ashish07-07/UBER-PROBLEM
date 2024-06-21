// import { WebSocket } from "ws";

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

//   private handleDriverMessage(driverId: string, message: any): void {
//     console.log(`Driver ${driverId} sent data:`, message);
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
//         await redisClient.geoAdd("driver", longitude, latitude);
//         console.log("updated in redis");
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
//       console.log(driverId);
//       console.log("came here next is redis");
//       try {
//         // console.log(redisClient);

//         // await redisClient.geoadd("drivers", {
//         //   longitude,
//         //   latitude,
//         //   member: driverId,
//         // });
//         // await redisClient.geoadd(
//         //   "drivers",
//         //   parseFloat(longitude),
//         //   parseFloat(latitude),
//         //   driverId
//         // );

//         await redisClient.geoadd(
//           "drivers",
//           parseFloat(longitude),
//           parseFloat(latitude),
//           driverId
//         );
//         console.log("Location updated in Redis for driver", driverId);
//       } catch (error) {
//         console.error("Error updating the driver location", error);
//       }
//     } else {
//       console.log(
//         `Driver ${driverId} sent an unhandled message type:`,
//         message
//       );
//     }
//   }

//   private async handleCustomerMessage(
//     customerId: string,
//     message: any
//   ): Promise<void> {
//     if (message.type === "locationUpdate") {
//       console.log(`Customer ${customerId} sent data:`, message);
//       console.log("i am trying to add the location update to redis");
//       const { from, to, distance } = message;

//       try {
//         await redisClient.geoadd(
//           "customers",
//           parseFloat(from.lng),
//           parseFloat(from.lat),
//           `${customerId}`
//         );

//         await redisClient.geoadd(
//           "customers",
//           parseFloat(to.lng),
//           parseFloat(to.lat),
//           `${customerId}:to`
//         );

//         await redisClient.set(
//           `distance:${customerId}`,
//           JSON.stringify(distance),
//           "EX",
//           3600
//         ); // Set expiration time to 1 hour

//         console.log(
//           `Location data updated in Redis for customer ${customerId}`
//         );
//       } catch (error) {
//         console.error("error updating to redis");
//       }
//     } else {
//       console.log(
//         `Customer ${customerId} sent an unhandled message type:`,
//         message
//       );
//     }
//   }

//   getDriverSocket(driverId: string): WebSocket | undefined {
//     return this.drivers[driverId];
//   }

//   getCustomerSocket(customerId: string): WebSocket | undefined {
//     return this.customers[customerId];
//   }
// }

// export default ConnectionManager;
// import { WebSocket } from "ws";
// import redisClient from "./redisClient";

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
//   }

//   unregisterClient(client: Client): void {
//     const { type, id } = client;
//     if (type === "driver") {
//       delete this.drivers[id];
//     } else if (type === "customer") {
//       delete this.customers[id];
//     }
//   }

//   async handleMessage(client: Client, message: any): Promise<void> {
//     const { type, id, socket } = client;
//     if (type === "driver") {
//       await this.handleDriverMessage(id, message);
//     } else if (type === "customer") {
//       await this.handleCustomerMessage(id, message);
//     }
//   }

//   private async handleDriverMessage(
//     driverId: string,
//     message: any
//   ): Promise<void> {
//     if (message.type === "locationUpdate") {
//       const { lat, lng } = message.location;
//       await redisClient.geoadd("drivers", lng, lat, driverId);
//     }
//   }

//   private async handleCustomerMessage(
//     customerId: string,
//     message: any
//   ): Promise<void> {
//     if (message.type === "locationUpdate") {
//       const { from, to, distance } = message;
//       await redisClient.geoadd("customers", from.lng, from.lat, customerId);
//       await redisClient.geoadd("customers", to.lng, to.lat, `${customerId}:to`);
//       await redisClient.set(
//         `distance:${customerId}`,
//         JSON.stringify(distance),
//         "EX",
//         3600
//       );

//       await this.calculateCustomerDensity(customerId, from);
//     } else if (message.type === "requestDensity") {
//       const { lat, lng } = message.location;
//       const density = await this.calculateCustomerDensity(customerId, {
//         lat,
//         lng,
//       });
//       const customerSocket = this.customers[customerId];
//       if (customerSocket) {
//         customerSocket.send(JSON.stringify({ type: "densityResult", density }));
//       }
//     }
//   }

//   private async calculateCustomerDensity(
//     customerId: string,
//     location: { lat: number; lng: number }
//   ): Promise<number> {
//     const radius = 4; // Radius in kilometers
//     const nearbyCustomers = await redisClient.georadius(
//       "customers",
//       location.lng,
//       location.lat,
//       radius,
//       "km"
//     );
//     const density = nearbyCustomers.length;
//     return density;
//   }
// }

// export default ConnectionManager;

// import { WebSocket } from "ws";
// import redisClient from "./redisClient";

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
//   }

//   unregisterClient(type: "driver" | "customer", id: string): void {
//     if (type === "driver") {
//       delete this.drivers[id];
//     } else if (type === "customer") {
//       delete this.customers[id];
//     }
//   }

//   async handleMessage(client: Client, message: any): Promise<void> {
//     const { type, id } = client;
//     if (type === "driver") {
//       await this.handleDriverMessage(id, message);
//     } else if (type === "customer") {
//       await this.handleCustomerMessage(id, message);
//     }
//   }

//   private async handleDriverMessage(
//     driverId: string,
//     message: any
//   ): Promise<void> {
//     if (message.type === "locationUpdate") {
//       const { lat, lng } = message.location;
//       await redisClient.geoadd("drivers", lng, lat, driverId);
//     }
//   }

//   private async handleCustomerMessage(
//     customerId: string,
//     message: any
//   ): Promise<void> {
//     if (message.type === "locationUpdate") {
//       const { from, to, distance } = message;
//       await redisClient.geoadd("customers", from.lng, from.lat, customerId);
//       await redisClient.geoadd("customers", to.lng, to.lat, `${customerId}:to`);
//       await redisClient.set(
//         `distance:${customerId}`,
//         JSON.stringify(distance),
//         "EX",
//         3600
//       );

//       await this.calculateCustomerDensity(customerId, from);
//     } else if (message.type === "requestDensity") {
//       const { lat, lng } = message.location;
//       const density = await this.calculateCustomerDensity(customerId, {
//         lat,
//         lng,
//       });
//       const customerSocket = this.customers[customerId];
//       if (customerSocket) {
//         customerSocket.send(JSON.stringify({ type: "densityResult", density }));
//       }
//     }
//   }

//   private async calculateCustomerDensity(
//     customerId: string,
//     location: { lat: number; lng: number }
//   ): Promise<number> {
//     const radius = 4; // Radius in kilometers
//     const nearbyCustomers = await redisClient.georadius(
//       "customers",
//       location.lng,
//       location.lat,
//       radius,
//       "km"
//     );
//     const density = nearbyCustomers.length;
//     return density;
//   }
// }

// export default ConnectionManager;

import { WebSocket } from "ws";
import redisClient from "./redisClient";

interface Client {
  type: "driver" | "customer";
  id: string;
  socket: WebSocket;
}

class ConnectionManager {
  private drivers: { [key: string]: WebSocket } = {};
  private customers: { [key: string]: WebSocket } = {};

  registerClient(client: Client): void {
    const { type, id, socket } = client;
    if (type === "driver") {
      this.drivers[id] = socket;
    } else if (type === "customer") {
      this.customers[id] = socket;
    }
  }

  unregisterClient(type: "driver" | "customer", id: string): void {
    if (type === "driver") {
      delete this.drivers[id];
    } else if (type === "customer") {
      delete this.customers[id];
    }
  }

  async handleMessage(
    clientType: "driver" | "customer",
    clientId: string,
    message: any
  ): Promise<void> {
    if (clientType === "driver") {
      await this.handleDriverMessage(clientId, message);
    } else if (clientType === "customer") {
      await this.handleCustomerMessage(clientId, message);
    }
  }

  private async handleDriverMessage(
    driverId: string,
    message: any
  ): Promise<void> {
    if (message.type === "locationUpdate") {
      const { lat, lng } = message.location;
      await redisClient.geoadd("drivers", lng, lat, driverId);
    }
  }

  private async handleCustomerMessage(
    customerId: string,
    message: any
  ): Promise<void> {
    if (message.type === "locationUpdate") {
      const { from, to, distance } = message;
      console.log(message);
      console.log(`driver with id ${customerId} sent the message ${message}`);
      await redisClient.geoadd("customers", from.lng, from.lat, customerId);
      await redisClient.geoadd("customers", to.lng, to.lat, `${customerId}:to`);
      await redisClient.set(
        `distance:${customerId}`,
        JSON.stringify(distance),
        "EX",
        3600
      );

      await this.calculateCustomerDensity(customerId, from);
    } else if (message.type === "requestDensity") {
      const { lat, lng } = message.location;
      const density = await this.calculateCustomerDensity(customerId, {
        lat,
        lng,
      });
      const customerSocket = this.customers[customerId];
      if (customerSocket) {
        customerSocket.send(JSON.stringify({ type: "densityResult", density }));
      }
    }
  }

  private async calculateCustomerDensity(
    customerId: string,
    location: { lat: number; lng: number }
  ): Promise<number> {
    const radius = 4; // Radius in kilometers
    const nearbyCustomers = await redisClient.georadius(
      "customers",
      location.lng,
      location.lat,
      radius,
      "km"
    );
    const density = nearbyCustomers.length;
    return density;
  }
}

export default ConnectionManager;
