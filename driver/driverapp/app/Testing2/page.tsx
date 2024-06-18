"use client";
import { useEffect, useState } from "react";

import { GoogleMapView } from "../component/GoogleMapaView";
import { useSession } from "next-auth/react";
import { NEXT_AUTH } from "../lib/auth";

export default function DriverDashboard() {
  const [location, setLocation] = useState({ lat: 20.9141, lng: 74.856 });
  const [ws, setWs] = useState<WebSocket | null>(null);
  //   const session = useSession();

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket("ws://localhost:8080"); // Replace with your WebSocket server URL
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      // Register the driver with the server
      socket.send(
        JSON.stringify({
          type: "register",
          clientType: "driver",
          clientId: "driver123", // Replace with the actual driver ID
        })
      );
    };

    socket.onmessage = (event) => {
      // Handle incoming messages if needed
      console.log("Message from server: ", event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          // Send location to WebSocket server
          if (ws) {
            ws.send(
              JSON.stringify({
                type: "locationUpdate",
                clientType: "driver",
                clientId: "driver123", // Replace with the actual driver ID
                latitude: latitude,
                longitude: longitude,
              })
            );
          }
        },
        (error) => {
          console.log("Error while getting location", error);
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [ws]);

  return (
    <div>
      <GoogleMapView center={location} />
      <div>
        {"My location is: "}
        {location.lat}, {location.lng}
      </div>
    </div>
  );
}
