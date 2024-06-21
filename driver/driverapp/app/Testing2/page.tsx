"use client";
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useSession } from "next-auth/react";

export default function DriverDashboard() {
  const [location, setLocation] = useState({ lat: 20.9141, lng: 74.856 });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { data: session, status } = useSession();
  const id = session?.user?.id;

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places"],
  });

  useEffect(() => {
    if (status === "authenticated" && id) {
      const socket = new WebSocket("ws://localhost:8080");
      console.log("got id now");
      setWs(socket);

      socket.onopen = () => {
        console.log("WebSocket connection opened");
        socket.send(
          JSON.stringify({
            type: "register",
            clientType: "driver",
            clientId: id,
          })
        );
      };

      socket.onmessage = (event) => {
        console.log("Message from server: ", event.data);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        socket.close();
      };
    } else {
      console.log("Driver ID is not available yet.");
    }
  }, [status, id]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          if (ws) {
            ws.send(
              JSON.stringify({
                type: "locationUpdate",
                clientType: "driver",
                clientId: id,
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
  }, [ws, id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg">
        {isLoaded ? (
          <div className="relative">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={location}
              zoom={14}
            >
              <Marker position={location} label="You" />
            </GoogleMap>
            <div className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded shadow-md">
              Your location is being tracked successfully.
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="mt-4 text-gray-700">
        <p>
          My location is: {location.lat}, {location.lng}
        </p>
      </div>
    </div>
  );
}
