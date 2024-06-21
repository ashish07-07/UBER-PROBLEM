"use client";
import { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { useSession } from "next-auth/react";

export interface Driver {
  id: string;
  distance: string;
}

export async function fetchNearbyDrivers(
  lat: number,
  lng: number,
  radius: number
): Promise<Driver[]> {
  try {
    const response = await fetch(`/api/finddrivers/${lat}/${lng}/${radius}`);
    if (!response.ok) {
      throw new Error("Failed to fetch drivers");
    }
    const data = await response.json();
    return data.drivers;
  } catch (error) {
    console.error("Error fetching nearby drivers:", error);
    return [];
  }
}

export default function CustomerDashboard() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places", "geometry"],
  });
  const { data: session, status } = useSession();
  const id = session?.user?.id;

  const [from, setFrom] = useState<google.maps.places.Autocomplete | null>(
    null
  );
  const [to, setTo] = useState<google.maps.places.Autocomplete | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [fromLocation, setFromLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [toLocation, setToLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [customerDensity, setCustomerDensity] = useState<number | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (status === "authenticated" && id) {
      const socket = new WebSocket("ws://localhost:8080");
      websocketRef.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connection opened");
        socket.send(
          JSON.stringify({
            type: "register",
            clientType: "customer",
            clientId: id,
          })
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "densityResult") {
          setCustomerDensity(data.density);
        }
        console.log("Message from server: ", data);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        socket.close();
      };
    }
  }, [status, id]);

  useEffect(() => {
    calculateDistance();
  }, [from, to]);

  function onLoadFrom(autocompleteInstance: google.maps.places.Autocomplete) {
    setFrom(autocompleteInstance);
  }

  function onLoadTo(autocompleteInstance: google.maps.places.Autocomplete) {
    setTo(autocompleteInstance);
  }

  function onPlaceChangedFrom() {
    if (from !== null) {
      const place = from.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setFromLocation({ lat: location.lat(), lng: location.lng() });
      }
    }
  }

  function onPlaceChangedTo() {
    if (to !== null) {
      const place = to.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setToLocation({ lat: location.lat(), lng: location.lng() });
        calculateDistance();
      }
    }
  }

  function calculateDistance() {
    const fromLocation = from?.getPlace();
    const toLocation = to?.getPlace();

    if (
      fromLocation &&
      fromLocation.geometry &&
      fromLocation.geometry.location &&
      toLocation &&
      toLocation.geometry &&
      toLocation.geometry.location
    ) {
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [fromLocation.geometry.location],
          destinations: [toLocation.geometry.location],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (
          response: google.maps.DistanceMatrixResponse | null,
          status: google.maps.DistanceMatrixStatus
        ) => {
          if (
            status === google.maps.DistanceMatrixStatus.OK &&
            response?.rows[0]?.elements[0]?.status ===
              google.maps.DistanceMatrixElementStatus.OK
          ) {
            const distanceText =
              response.rows[0].elements[0].distance?.text ||
              "Distance not available";
            setDistance(distanceText);
          } else {
            setDistance(null);
          }
        }
      );
    } else {
      setDistance(null);
    }
  }

  async function sendLocationData() {
    if (websocketRef.current && from && to && session) {
      const fromPlace = from.getPlace();
      const toPlace = to.getPlace();

      if (
        fromPlace &&
        fromPlace.geometry &&
        fromPlace.geometry.location &&
        toPlace &&
        toPlace.geometry &&
        toPlace.geometry.location
      ) {
        const locationData = {
          type: "locationUpdate",
          from: {
            lat: fromPlace.geometry.location.lat(),
            lng: fromPlace.geometry.location.lng(),
          },
          to: {
            lat: toPlace.geometry.location.lat(),
            lng: toPlace.geometry.location.lng(),
          },
          distance,
          clientType: "customer",
          id: session.user.id,
        };

        websocketRef.current.send(JSON.stringify(locationData));
        console.log("Location data sent:", locationData);

        // Fetch nearby drivers after sending location data
        const fetchedDrivers = await fetchNearbyDrivers(
          fromPlace.geometry.location.lat(),
          fromPlace.geometry.location.lng(),
          5
        );
        setDrivers(fetchedDrivers);

        // Request customer density
        websocketRef.current.send(
          JSON.stringify({
            type: "requestDensity",
            location: {
              lat: fromPlace.geometry.location.lat(),
              lng: fromPlace.geometry.location.lng(),
            },
          })
        );
      }
    }
  }

  return isLoaded ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div>
          <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
            <input
              type="text"
              className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="From"
              style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
            />
          </Autocomplete>

          <Autocomplete onLoad={onLoadTo} onPlaceChanged={onPlaceChangedTo}>
            <input
              type="text"
              className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="To"
              style={{
                width: "100%",
                height: "32px",
                boxSizing: "border-box",
                marginTop: "8px",
              }}
            />
          </Autocomplete>
        </div>
        {distance && (
          <div className="mt-2 text-gray-900">
            Distance: {distance} Cost wauld be {parseInt(distance) * 17} Rs
          </div>
        )}
        <button
          onClick={sendLocationData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Send Location Data
        </button>
        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={fromLocation || { lat: 20.9141, lng: 74.856 }}
            zoom={10}
          >
            {fromLocation && <Marker position={fromLocation} label="From" />}
            {toLocation && <Marker position={toLocation} label="To" />}
          </GoogleMap>
        </div>
        <div className="mt-4">
          <h3>Nearby Drivers</h3>
          {drivers.length === 0 ? (
            <p>No drivers found within the specified radius.</p>
          ) : (
            <ul>
              {drivers.map((driver) => (
                <li key={driver.id} className="text-black">
                  Drivers Found are Driver ID: {driver.id}, Distance:{" "}
                  {driver.distance} km
                </li>
              ))}
            </ul>
          )}
        </div>
        {customerDensity !== null && (
          <div className="mt-4">
            <h3>Customer Density</h3>
            <p className="text-black font-extrabold">
              There are {customerDensity} customers within a 4 km radius.
            </p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-white">Loading...</div>
    </div>
  );
}
