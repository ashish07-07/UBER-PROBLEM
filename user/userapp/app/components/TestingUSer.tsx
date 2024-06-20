// "use client";
// import { useState } from "react";
// import { useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
// } from "@react-google-maps/api";

// export function UserInput() {
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"],
//   });

//   const [from, setFrom] = useState<google.maps.places.Autocomplete | null>(
//     null
//   );
//   const [to, setTo] = useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);

//   useEffect(() => {
//     calculateDistance();
//   }, [from, to]);

//   function onLoadFrom(autocompleteInstance: google.maps.places.Autocomplete) {
//     setFrom(autocompleteInstance);
//   }

//   function onLoadTo(autocompleteInstance: google.maps.places.Autocomplete) {
//     setTo(autocompleteInstance);
//   }

//   function onPlaceChangedFrom() {
//     if (from !== null) {
//       const place = from.getPlace();
//       console.log(place.address_components);
//     } else {
//       console.log("Error: From location autocomplete instance is null");
//     }
//   }

//   function onPlaceChangedTo() {
//     if (to !== null) {
//       const place = to.getPlace();
//       console.log(place);

//       calculateDistance();
//     } else {
//       console.log("Error: To location autocomplete instance is null");
//     }
//   }

//   function calculateDistance() {
//     const fromLocation = from?.getPlace();
//     const toLocation = to?.getPlace();

//     if (
//       fromLocation &&
//       fromLocation.geometry &&
//       fromLocation.geometry.location &&
//       toLocation &&
//       toLocation.geometry &&
//       toLocation.geometry.location
//     ) {
//       console.log("Calculating distance between:");
//       console.log("From:", fromLocation.geometry.location.toString());
//       console.log("To:", toLocation.geometry.location.toString());

//       const service = new google.maps.DistanceMatrixService();
//       service.getDistanceMatrix(
//         {
//           origins: [fromLocation.geometry.location],
//           destinations: [toLocation.geometry.location],
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (
//           response: google.maps.DistanceMatrixResponse | null,
//           status: google.maps.DistanceMatrixStatus
//         ) => {
//           if (
//             status === google.maps.DistanceMatrixStatus.OK &&
//             response?.rows[0]?.elements[0]?.status ===
//               google.maps.DistanceMatrixElementStatus.OK
//           ) {
//             const distanceText =
//               response.rows[0].elements[0].distance?.text ||
//               "Distance not available";
//             setDistance(distanceText);
//             console.log("Distance calculated:", distanceText);
//           } else {
//             console.log("Error calculating distance:", status);
//             setDistance(null);
//           }
//         }
//       );
//     } else {
//       console.log("Place or place geometry not available");
//       setDistance(null);
//     }
//   }

//   return isLoaded ? (
//     <div>
//       <div>
//         <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="From"
//             style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//           />
//         </Autocomplete>

//         <Autocomplete onLoad={onLoadTo} onPlaceChanged={onPlaceChangedTo}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="To"
//             style={{
//               width: "100%",
//               height: "32px",
//               boxSizing: "border-box",
//               marginTop: "8px",
//             }}
//           />
//         </Autocomplete>
//       </div>
//       {distance && <div className="mt-2 text-white">Distance: {distance}</div>}
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
// } from "@react-google-maps/api";
// import { useSession } from "next-auth/react";

// export function UserInput() {
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"],
//   });

//   const [from, setFrom] = useState<google.maps.places.Autocomplete | null>(
//     null
//   );
//   const [to, setTo] = useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);
//   const session = useSession();
//   const id = session.data?.user.id;
//   console.log(id);

//   useEffect(() => {
//     calculateDistance();
//   }, [from, to]);

//   function onLoadFrom(autocompleteInstance: google.maps.places.Autocomplete) {
//     setFrom(autocompleteInstance);
//   }

//   function onLoadTo(autocompleteInstance: google.maps.places.Autocomplete) {
//     setTo(autocompleteInstance);
//   }

//   function onPlaceChangedFrom() {
//     if (from !== null) {
//       const place = from.getPlace();
//       console.log(place.address_components);
//     } else {
//       console.log("Error: From location autocomplete instance is null");
//     }
//   }

//   function onPlaceChangedTo() {
//     if (to !== null) {
//       const place = to.getPlace();
//       console.log(place);

//       calculateDistance();
//     } else {
//       console.log("Error: To location autocomplete instance is null");
//     }
//   }

//   function calculateDistance() {
//     const fromLocation = from?.getPlace();
//     const toLocation = to?.getPlace();

//     if (
//       fromLocation &&
//       fromLocation.geometry &&
//       fromLocation.geometry.location &&
//       toLocation &&
//       toLocation.geometry &&
//       toLocation.geometry.location
//     ) {
//       console.log("Calculating distance between:");
//       console.log("From:", fromLocation.geometry.location.toString());
//       console.log("To:", toLocation.geometry.location.toString());

//       const service = new google.maps.DistanceMatrixService();
//       service.getDistanceMatrix(
//         {
//           origins: [fromLocation.geometry.location],
//           destinations: [toLocation.geometry.location],
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (
//           response: google.maps.DistanceMatrixResponse | null,
//           status: google.maps.DistanceMatrixStatus
//         ) => {
//           if (
//             status === google.maps.DistanceMatrixStatus.OK &&
//             response?.rows[0]?.elements[0]?.status ===
//               google.maps.DistanceMatrixElementStatus.OK
//           ) {
//             const distanceText =
//               response.rows[0].elements[0].distance?.text ||
//               "Distance not available";
//             setDistance(distanceText);
//             console.log("Distance calculated:", distanceText);
//           } else {
//             console.log("Error calculating distance:", status);
//             setDistance(null);
//           }
//         }
//       );
//     } else {
//       console.log("Place or place geometry not available");
//       setDistance(null);
//     }
//   }

//   return isLoaded ? (
//     <div className="flex items-center justify-center min-h-screen bg-grey-800">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <div>
//           <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//             <input
//               type="text"
//               className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="From"
//               style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//             />
//           </Autocomplete>

//           <Autocomplete onLoad={onLoadTo} onPlaceChanged={onPlaceChangedTo}>
//             <input
//               type="text"
//               className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="To"
//               style={{
//                 width: "100%",
//                 height: "32px",
//                 boxSizing: "border-box",
//                 marginTop: "8px",
//               }}
//             />
//           </Autocomplete>
//         </div>
//         {distance && (
//           <div className="mt-2 text-gray-900">Distance: {distance}</div>
//         )}
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="text-white">Loading...</div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState, useRef } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
//   Marker,
// } from "@react-google-maps/api";
// import { useSession } from "next-auth/react";

// export default function CustomerDashboard() {
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"],
//   });

//   const { data: session, status } = useSession();
//   const id = session?.user?.id;

//   const [from, setFrom] = useState<google.maps.places.Autocomplete | null>(
//     null
//   );
//   const [to, setTo] = useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);
//   const [fromLocation, setFromLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [toLocation, setToLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const websocketRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     // Wait until the session is authenticated and the id is available
//     if (status === "authenticated" && id) {
//       const socket = new WebSocket("ws://localhost:8080");
//       console.log("got id now");
//       websocketRef.current = socket;

//       socket.onopen = () => {
//         console.log("WebSocket connection opened");
//         socket.send(
//           JSON.stringify({
//             type: "register",
//             clientType: "customer",
//             clientId: id,
//           })
//         );
//       };

//       socket.onmessage = (event) => {
//         console.log("Message from server: ", event.data);
//       };

//       socket.onclose = () => {
//         console.log("WebSocket connection closed");
//       };

//       return () => {
//         socket.close();
//       };
//     } else {
//       console.log("Customer ID is not available yet.");
//     }
//   }, [status, id]);

//   useEffect(() => {
//     calculateDistance();
//   }, [from, to]);

//   function onLoadFrom(autocompleteInstance: google.maps.places.Autocomplete) {
//     setFrom(autocompleteInstance);
//   }

//   function onLoadTo(autocompleteInstance: google.maps.places.Autocomplete) {
//     setTo(autocompleteInstance);
//   }

//   function onPlaceChangedFrom() {
//     if (from !== null) {
//       const place = from.getPlace();
//       if (place.geometry && place.geometry.location) {
//         const location = place.geometry.location;
//         setFromLocation({ lat: location.lat(), lng: location.lng() });
//       }
//     } else {
//       console.log("Error: From location autocomplete instance is null");
//     }
//   }

//   function onPlaceChangedTo() {
//     if (to !== null) {
//       const place = to.getPlace();
//       if (place.geometry && place.geometry.location) {
//         const location = place.geometry.location;
//         setToLocation({ lat: location.lat(), lng: location.lng() });
//         calculateDistance();
//       }
//     } else {
//       console.log("Error: To location autocomplete instance is null");
//     }
//   }

//   function calculateDistance() {
//     const fromLocation = from?.getPlace();
//     const toLocation = to?.getPlace();

//     if (
//       fromLocation &&
//       fromLocation.geometry &&
//       fromLocation.geometry.location &&
//       toLocation &&
//       toLocation.geometry &&
//       toLocation.geometry.location
//     ) {
//       console.log("Calculating distance between:");
//       console.log("From:", fromLocation.geometry.location.toString());
//       console.log("To:", toLocation.geometry.location.toString());

//       const service = new google.maps.DistanceMatrixService();
//       service.getDistanceMatrix(
//         {
//           origins: [fromLocation.geometry.location],
//           destinations: [toLocation.geometry.location],
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (
//           response: google.maps.DistanceMatrixResponse | null,
//           status: google.maps.DistanceMatrixStatus
//         ) => {
//           if (
//             status === google.maps.DistanceMatrixStatus.OK &&
//             response?.rows[0]?.elements[0]?.status ===
//               google.maps.DistanceMatrixElementStatus.OK
//           ) {
//             const distanceText =
//               response.rows[0].elements[0].distance?.text ||
//               "Distance not available";
//             setDistance(distanceText);
//             console.log("Distance calculated:", distanceText);
//           } else {
//             console.log("Error calculating distance:", status);
//             setDistance(null);
//           }
//         }
//       );
//     } else {
//       console.log("Place or place geometry not available");
//       setDistance(null);
//     }
//   }

//   function sendLocationData() {
//     if (websocketRef.current && from && to && session) {
//       const fromPlace = from.getPlace();
//       const toPlace = to.getPlace();

//       if (
//         fromPlace &&
//         fromPlace.geometry &&
//         fromPlace.geometry.location &&
//         toPlace &&
//         toPlace.geometry &&
//         toPlace.geometry.location
//       ) {
//         const locationData = {
//           type: "locationUpdate",
//           from: {
//             lat: fromPlace.geometry.location.lat(),
//             lng: fromPlace.geometry.location.lng(),
//           },
//           to: {
//             lat: toPlace.geometry.location.lat(),
//             lng: toPlace.geometry.location.lng(),
//           },
//           distance,
//           clientType: "customer", // Include client type in the message
//           id: session.user.id, // Assuming the session contains the user ID
//         };

//         websocketRef.current.send(JSON.stringify(locationData));
//         console.log("Location data sent:", locationData);
//       } else {
//         console.log("Error: Place geometry not available");
//       }
//     }
//   }

//   return isLoaded ? (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <div>
//           <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//             <input
//               type="text"
//               className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="From"
//               style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//             />
//           </Autocomplete>

//           <Autocomplete onLoad={onLoadTo} onPlaceChanged={onPlaceChangedTo}>
//             <input
//               type="text"
//               className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="To"
//               style={{
//                 width: "100%",
//                 height: "32px",
//                 boxSizing: "border-box",
//                 marginTop: "8px",
//               }}
//             />
//           </Autocomplete>
//         </div>
//         {distance && (
//           <div className="mt-2 text-gray-900">Distance: {distance}</div>
//         )}
//         <button
//           onClick={sendLocationData}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
//         >
//           Send Location Data
//         </button>
//         <div className="mt-4">
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "400px" }}
//             center={fromLocation || { lat: 20.9141, lng: 74.856 }}
//             zoom={10}
//           >
//             {fromLocation && <Marker position={fromLocation} label="From" />}
//             {toLocation && <Marker position={toLocation} label="To" />}
//           </GoogleMap>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="text-white">Loading...</div>
//     </div>
//   );
// }
// "use client";
// import { useEffect, useState, useRef } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
//   Marker,
// } from "@react-google-maps/api";
// import { useSession } from "next-auth/react";

// interface Driver {
//   id: string;
//   distance: string;
// }

// export default function CustomerDashboard() {
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"],
//   });

//   const { data: session, status } = useSession();
//   const id = session?.user?.id;

//   const [from, setFrom] = useState<google.maps.places.Autocomplete | null>(
//     null
//   );
//   const [to, setTo] = useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);
//   const [fromLocation, setFromLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [toLocation, setToLocation] = useState<{
//     lat: number;
//     lng: number;
//   } | null>(null);
//   const [drivers, setDrivers] = useState<Driver[]>([]);
//   const websocketRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     // Wait until the session is authenticated and the id is available
//     if (status === "authenticated" && id) {
//       const socket = new WebSocket("ws://localhost:8080");
//       console.log("got id now");
//       websocketRef.current = socket;

//       socket.onopen = () => {
//         console.log("WebSocket connection opened");
//         socket.send(
//           JSON.stringify({
//             type: "register",
//             clientType: "customer",
//             clientId: id,
//           })
//         );
//       };

//       socket.onmessage = (event) => {
//         console.log("Message from server: ", event.data);
//       };

//       socket.onclose = () => {
//         console.log("WebSocket connection closed");
//       };

//       return () => {
//         socket.close();
//       };
//     } else {
//       console.log("Customer ID is not available yet.");
//     }
//   }, [status, id]);

//   useEffect(() => {
//     calculateDistance();
//   }, [from, to]);

//   function onLoadFrom(autocompleteInstance: google.maps.places.Autocomplete) {
//     setFrom(autocompleteInstance);
//   }

//   function onLoadTo(autocompleteInstance: google.maps.places.Autocomplete) {
//     setTo(autocompleteInstance);
//   }

//   function onPlaceChangedFrom() {
//     if (from !== null) {
//       const place = from.getPlace();
//       if (place.geometry && place.geometry.location) {
//         const location = place.geometry.location;
//         setFromLocation({ lat: location.lat(), lng: location.lng() });
//       }
//     } else {
//       console.log("Error: From location autocomplete instance is null");
//     }
//   }

//   function onPlaceChangedTo() {
//     if (to !== null) {
//       const place = to.getPlace();
//       if (place.geometry && place.geometry.location) {
//         const location = place.geometry.location;
//         setToLocation({ lat: location.lat(), lng: location.lng() });
//         calculateDistance();
//       }
//     } else {
//       console.log("Error: To location autocomplete instance is null");
//     }
//   }

//   function calculateDistance() {
//     const fromLocation = from?.getPlace();
//     const toLocation = to?.getPlace();

//     if (
//       fromLocation &&
//       fromLocation.geometry &&
//       fromLocation.geometry.location &&
//       toLocation &&
//       toLocation.geometry &&
//       toLocation.geometry.location
//     ) {
//       console.log("Calculating distance between:");
//       console.log("From:", fromLocation.geometry.location.toString());
//       console.log("To:", toLocation.geometry.location.toString());

//       const service = new google.maps.DistanceMatrixService();
//       service.getDistanceMatrix(
//         {
//           origins: [fromLocation.geometry.location],
//           destinations: [toLocation.geometry.location],
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (
//           response: google.maps.DistanceMatrixResponse | null,
//           status: google.maps.DistanceMatrixStatus
//         ) => {
//           if (
//             status === google.maps.DistanceMatrixStatus.OK &&
//             response?.rows[0]?.elements[0]?.status ===
//               google.maps.DistanceMatrixElementStatus.OK
//           ) {
//             const distanceText =
//               response.rows[0].elements[0].distance?.text ||
//               "Distance not available";
//             setDistance(distanceText);
//             console.log("Distance calculated:", distanceText);
//           } else {
//             console.log("Error calculating distance:", status);
//             setDistance(null);
//           }
//         }
//       );
//     } else {
//       console.log("Place or place geometry not available");
//       setDistance(null);
//     }
//   }

//   async function sendLocationData() {
//     if (websocketRef.current && from && to && session) {
//       const fromPlace = from.getPlace();
//       const toPlace = to.getPlace();

//       if (
//         fromPlace &&
//         fromPlace.geometry &&
//         fromPlace.geometry.location &&
//         toPlace &&
//         toPlace.geometry &&
//         toPlace.geometry.location
//       ) {
//         const locationData = {
//           type: "locationUpdate",
//           from: {
//             lat: fromPlace.geometry.location.lat(),
//             lng: fromPlace.geometry.location.lng(),
//           },
//           to: {
//             lat: toPlace.geometry.location.lat(),
//             lng: toPlace.geometry.location.lng(),
//           },
//           distance,
//           clientType: "customer", // Include client type in the message
//           id: session.user.id, // Assuming the session contains the user ID
//         };

//         websocketRef.current.send(JSON.stringify(locationData));
//         console.log("Location data sent:", locationData);

//         // Fetch nearby drivers after sending location data
//         const fetchedDrivers = await fetchNearbyDrivers(
//           locationData.from.lat,
//           locationData.from.lng,
//           5 // You can adjust the radius as needed
//         );
//         setDrivers(fetchedDrivers);
//       } else {
//         console.log("Error: Place geometry not available");
//       }
//     }
//   }

//   async function fetchNearbyDrivers(
//     lat: number,
//     lng: number,
//     radius: number
//   ): Promise<Driver[]> {
//     try {
//       const response = await fetch(`/api/finddrivers/${lat}/${lng}/${radius}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch drivers");
//       }
//       const data = await response.json();
//       return data.drivers;
//     } catch (error) {
//       console.error("Error fetching nearby drivers:", error);
//       return [];
//     }
//   }

//   return isLoaded ? (
//     <div className="flex items-center justify-center min-h-screen bg-gray-800">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <div>
//           <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//             <input
//               type="text"
//               className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="From"
//               style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//             />
//           </Autocomplete>

//           <Autocomplete onLoad={onLoadTo} onPlaceChanged={onPlaceChangedTo}>
//             <input
//               type="text"
//               className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="To"
//               style={{
//                 width: "100%",
//                 height: "32px",
//                 boxSizing: "border-box",
//                 marginTop: "8px",
//               }}
//             />
//           </Autocomplete>
//         </div>
//         {distance && (
//           <div className="mt-2 text-gray-900">Distance: {distance}</div>
//         )}
//         <button
//           onClick={sendLocationData}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
//         >
//           Send Location Data
//         </button>
//         <div className="mt-4">
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "400px" }}
//             center={fromLocation || { lat: 20.9141, lng: 74.856 }}
//             zoom={10}
//           >
//             {fromLocation && <Marker position={fromLocation} label="From" />}
//             {toLocation && <Marker position={toLocation} label="To" />}
//           </GoogleMap>
//         </div>
//         <div className="mt-4">
//           <h2>Nearby Drivers</
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
        console.log("Message from server: ", event.data);
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
          5 // Use a default radius of 5 km or make it configurable
        );
        setDrivers(fetchedDrivers);
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
          <div className="mt-2 text-gray-900">Distance: {distance}</div>
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
                  The Driver Found is Driver ID: {driver.id}, Distance:{" "}
                  {driver.distance} km
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-white">Loading...</div>
    </div>
  );
}
