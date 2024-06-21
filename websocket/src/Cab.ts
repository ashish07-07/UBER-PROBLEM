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
