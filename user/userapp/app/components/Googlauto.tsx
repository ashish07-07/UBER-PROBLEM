// "use client";

// import React, { useState } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
// } from "@react-google-maps/api";

// // Ensure to import the types for the google namespace
// /// <reference types="@types/google.maps" />

// export function GoogleMapView() {
//   const containerStyle = {
//     width: "100%",
//     height: "70vh",
//   };

//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
//   const coordinate = { lat: 12.9141, lng: 74.856 };

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places"],
//   });

//   const [autocomplete, setAutocomplete] =
//     useState<google.maps.places.Autocomplete | null>(null);

//   const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
//     setAutocomplete(autocompleteInstance);
//   };

//   const onPlaceChanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();

//       console.log(place);
//     } else {
//       console.log("Autocomplete is not loaded yet!");
//     }
//   };
//   const onToplacechanged = () => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       settolocation(place.adr_address);

//       console.log(place);
//     } else {
//       console.log("Autocomplete is not loaded yet!");
//     }
//   };

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   const [from, setfromlocation] = useState();
//   const [to, settolocation] = useState();

//   return isLoaded ? (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div style={{ width: "50%" }}>
//         <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="To"
//             style={{
//               boxSizing: "border-box",
//               width: "100%",
//               height: "32px",
//             }}
//           />
//         </Autocomplete>
//         <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="From"
//             style={{
//               boxSizing: "border-box",
//               width: "100%",
//               height: "32px",
//             }}
//           />
//         </Autocomplete>
//       </div>
//       <div style={{ width: "100%", height: "70vh", marginTop: "16px" }}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={coordinate}
//           zoom={13}
//         >
//           {/* Additional map components, like markers, can be added here */}
//         </GoogleMap>
//       </div>
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
// } from "@react-google-maps/api";

// // Ensure to import the types for the google namespace
// /// <reference types="@types/google.maps" />

// export function GoogleMapView() {
//   const containerStyle = {
//     width: "100%",
//     height: "70vh",
//   };

//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
//   const coordinate = { lat: 12.9141, lng: 74.856 };

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"], // Include geometry library for distance calculations
//   });

//   const [autocompleteFrom, setAutocompleteFrom] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const [autocompleteTo, setAutocompleteTo] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);

//   useEffect(() => {
//     if (autocompleteFrom && autocompleteTo) {
//       // Calculate distance when both autocomplete instances are loaded
//       calculateDistance();
//     }
//   }, [autocompleteFrom, autocompleteTo]);

//   const onLoadFrom = (
//     autocompleteInstance: google.maps.places.Autocomplete
//   ) => {
//     setAutocompleteFrom(autocompleteInstance);
//   };

//   const onLoadTo = (autocompleteInstance: google.maps.places.Autocomplete) => {
//     setAutocompleteTo(autocompleteInstance);
//   };

//   const onPlaceChangedFrom = () => {
//     if (autocompleteFrom !== null) {
//       const place = autocompleteFrom.getPlace();
//       console.log("From:", place);
//     } else {
//       console.log("Autocomplete for From location is not loaded yet!");
//     }
//   };

//   const onPlaceChangedTo = () => {
//     if (autocompleteTo !== null) {
//       const place = autocompleteTo.getPlace();
//       console.log("To:", place);
//     } else {
//       console.log("Autocomplete for To location is not loaded yet!");
//     }
//   };

//   const calculateDistance = () => {
//     if (autocompleteFrom && autocompleteTo) {
//       const fromPlace = autocompleteFrom.getPlace();
//       const toPlace = autocompleteTo.getPlace();

//       if (fromPlace.geometry && toPlace.geometry) {
//         const service = new google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//           {
//             origins: [fromPlace.geometry.location],
//             destinations: [toPlace.geometry.location],
//             travelMode: google.maps.TravelMode.DRIVING,
//           },
//           (response, status) => {
//             if (
//               status === "OK" &&
//               response.rows[0].elements[0].status === "OK"
//             ) {
//               const distanceText =
//                 response.rows[0].elements[0].distance?.text ||
//                 "Distance not available";
//               setDistance(distanceText);
//             } else {
//               console.log("Error calculating distance:", status);
//               setDistance(null);
//             }
//           }
//         );
//       }
//     }
//   };

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   return isLoaded ? (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div style={{ width: "50%" }}>
//         {/* From location input */}
//         <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="From"
//             style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//           />
//         </Autocomplete>
//         {/* To location input */}
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
//         {/* Display distance */}
//         {distance && (
//           <div style={{ marginTop: "8px" }}>Distance: {distance}</div>
//         )}
//       </div>
//       <div style={{ width: "100%", height: "70vh", marginTop: "16px" }}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={coordinate}
//           zoom={13}
//         >
//           {/* Additional map components, like markers, can be added here */}
//         </GoogleMap>
//       </div>
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
// } from "@react-google-maps/api";

// // Ensure to import the types for the google namespace
// /// <reference types="@types/google.maps" />

// export function GoogleMapView() {
//   const containerStyle = {
//     width: "100%",
//     height: "70vh",
//   };

//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
//   const coordinate = { lat: 12.9141, lng: 74.856 };

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"], // Include geometry library for distance calculations
//   });

//   const [autocompleteFrom, setAutocompleteFrom] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const [autocompleteTo, setAutocompleteTo] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);

//   useEffect(() => {
//     if (autocompleteFrom && autocompleteTo) {
//       // Calculate distance when both autocomplete instances are loaded
//       calculateDistance();
//     }
//   }, [autocompleteFrom, autocompleteTo]);

//   const onLoadFrom = (
//     autocompleteInstance: google.maps.places.Autocomplete
//   ) => {
//     setAutocompleteFrom(autocompleteInstance);
//   };

//   const onLoadTo = (autocompleteInstance: google.maps.places.Autocomplete) => {
//     setAutocompleteTo(autocompleteInstance);
//   };

//   const onPlaceChangedFrom = () => {
//     if (autocompleteFrom !== null) {
//       const place = autocompleteFrom.getPlace();
//       console.log("From:", place);
//     } else {
//       console.log("Autocomplete for From location is not loaded yet!");
//     }
//   };

//   const onPlaceChangedTo = () => {
//     if (autocompleteTo !== null) {
//       const place = autocompleteTo.getPlace();
//       console.log("To:", place);
//     } else {
//       console.log("Autocomplete for To location is not loaded yet!");
//     }
//   };

//   const calculateDistance = () => {
//     if (autocompleteFrom && autocompleteTo) {
//       const fromPlace = autocompleteFrom.getPlace();
//       const toPlace = autocompleteTo.getPlace();

//       if (
//         fromPlace.geometry &&
//         fromPlace.geometry.location &&
//         toPlace.geometry &&
//         toPlace.geometry.location
//       ) {
//         const service = new google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//           {
//             origins: [fromPlace.geometry.location],
//             destinations: [toPlace.geometry.location],
//             travelMode: google.maps.TravelMode.DRIVING,
//           },
//           (response, status) => {
//             if (
//               status === "OK" &&
//               response.rows[0].elements[0].status === "OK"
//             ) {
//               const distanceText =
//                 response.rows[0].elements[0].distance?.text ||
//                 "Distance not available";
//               setDistance(distanceText);
//             } else {
//               console.log("Error calculating distance:", status);
//               setDistance(null);
//             }
//           }
//         );
//       } else {
//         console.log("Place geometry or location not available");
//         setDistance(null);
//       }
//     }
//   };

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   return isLoaded ? (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div style={{ width: "50%" }}>
//         {/* From location input */}
//         <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="From"
//             style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//           />
//         </Autocomplete>
//         {/* To location input */}
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
//         {/* Display distance */}
//         {distance && (
//           <div style={{ marginTop: "8px" }}>Distance: {distance}</div>
//         )}
//       </div>
//       <div style={{ width: "100%", height: "70vh", marginTop: "16px" }}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={coordinate}
//           zoom={13}
//         >
//           {/* Additional map components, like markers, can be added here */}
//         </GoogleMap>
//       </div>
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Autocomplete,
// } from "@react-google-maps/api";

// // Ensure to import the types for the google namespace
// /// <reference types="@types/google.maps" />

// export function GoogleMapView() {
//   const containerStyle = {
//     width: "100%",
//     height: "70vh",
//   };

//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
//   const coordinate = { lat: 12.9141, lng: 74.856 };

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: googleMapsApiKey,
//     libraries: ["places", "geometry"], // Include geometry library for distance calculations
//   });

//   const [autocompleteFrom, setAutocompleteFrom] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const [autocompleteTo, setAutocompleteTo] =
//     useState<google.maps.places.Autocomplete | null>(null);
//   const [distance, setDistance] = useState<string | null>(null);

//   useEffect(() => {
//     if (autocompleteFrom && autocompleteTo) {
//       // Calculate distance when both autocomplete instances are loaded
//       calculateDistance();
//     }
//   }, [autocompleteFrom, autocompleteTo]);

//   const onLoadFrom = (
//     autocompleteInstance: google.maps.places.Autocomplete
//   ) => {
//     setAutocompleteFrom(autocompleteInstance);
//   };

//   const onLoadTo = (autocompleteInstance: google.maps.places.Autocomplete) => {
//     setAutocompleteTo(autocompleteInstance);
//   };

//   const onPlaceChangedFrom = () => {
//     if (autocompleteFrom !== null) {
//       const place = autocompleteFrom.getPlace();
//       console.log("From:", place);
//     } else {
//       console.log("Autocomplete for From location is not loaded yet!");
//     }
//   };

//   const onPlaceChangedTo = () => {
//     if (autocompleteTo !== null) {
//       const place = autocompleteTo.getPlace();
//       console.log("To:", place);
//     } else {
//       console.log("Autocomplete for To location is not loaded yet!");
//     }
//   };

//   const calculateDistance = () => {
//     if (autocompleteFrom && autocompleteTo) {
//       const fromPlace = autocompleteFrom.getPlace();
//       const toPlace = autocompleteTo.getPlace();

//       if (
//         fromPlace.geometry &&
//         fromPlace.geometry.location &&
//         toPlace.geometry &&
//         toPlace.geometry.location
//       ) {
//         const service = new google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//           {
//             origins: [fromPlace.geometry.location],
//             destinations: [toPlace.geometry.location],
//             travelMode: google.maps.TravelMode.DRIVING,
//           },
//           (
//             response: google.maps.DistanceMatrixResponse | null,
//             status: google.maps.DistanceMatrixStatus
//           ) => {
//             if (
//               status === google.maps.DistanceMatrixStatus.OK &&
//               response?.rows[0]?.elements[0]?.status ===
//                 google.maps.DistanceMatrixElementStatus.OK
//             ) {
//               const distanceText =
//                 response.rows[0].elements[0].distance?.text ||
//                 "Distance not available";
//               setDistance(distanceText);
//             } else {
//               console.log("Error calculating distance:", status);
//               setDistance(null);
//             }
//           }
//         );
//       } else {
//         console.log("Place geometry or location not available");
//         setDistance(null);
//       }
//     }
//   };

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   return isLoaded ? (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div style={{ width: "50%" }}>
//         {/* From location input */}
//         <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
//           <input
//             type="text"
//             className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="From"
//             style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
//           />
//         </Autocomplete>
//         {/* To location input */}
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
//         {/* Display distance */}
//         {distance && (
//           <div style={{ marginTop: "8px" }}>Distance: {distance}</div>
//         )}
//       </div>
//       <div style={{ width: "100%", height: "70vh", marginTop: "16px" }}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={coordinate}
//           zoom={13}
//         >
//           {/* Additional map components, like markers, can be added here */}
//         </GoogleMap>
//       </div>
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

// Ensure to import the types for the google namespace
/// <reference types="@types/google.maps" />

export function GoogleMapView() {
  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const coordinate = { lat: 12.9141, lng: 74.856 };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places", "geometry"], // Include geometry library for distance calculations
  });

  const [autocompleteFrom, setAutocompleteFrom] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteTo, setAutocompleteTo] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    if (autocompleteFrom && autocompleteTo) {
      // Calculate distance when both autocomplete instances are loaded
      calculateDistance();
    }
  }, [autocompleteFrom, autocompleteTo]);

  const onLoadFrom = (
    autocompleteInstance: google.maps.places.Autocomplete
  ) => {
    setAutocompleteFrom(autocompleteInstance);
  };

  const onLoadTo = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocompleteTo(autocompleteInstance);
  };

  const onPlaceChangedFrom = () => {
    if (autocompleteFrom !== null) {
      const place = autocompleteFrom.getPlace();
      console.log("From:", place);
    } else {
      console.log("Autocomplete for From location is not loaded yet!");
    }
  };

  const onPlaceChangedTo = () => {
    if (autocompleteTo !== null) {
      const place = autocompleteTo.getPlace();
      console.log("To:", place);
    } else {
      console.log("Autocomplete for To location is not loaded yet!");
    }
  };

  const calculateDistance = () => {
    if (autocompleteFrom && autocompleteTo) {
      const fromPlace = autocompleteFrom.getPlace();
      const toPlace = autocompleteTo.getPlace();

      if (
        fromPlace &&
        fromPlace.geometry &&
        fromPlace.geometry.location &&
        toPlace &&
        toPlace.geometry &&
        toPlace.geometry.location
      ) {
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [fromPlace.geometry.location],
            destinations: [toPlace.geometry.location],
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
              console.log("Error calculating distance:", status);
              setDistance(null);
            }
          }
        );
      } else {
        console.log("Place or place geometry not available");
        setDistance(null);
      }
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "50%" }}>
        {/* From location input */}
        <Autocomplete onLoad={onLoadFrom} onPlaceChanged={onPlaceChangedFrom}>
          <input
            type="text"
            className="text-gray-900 text-lg border border-gray-300 rounded-md shadow-sm px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="From"
            style={{ width: "100%", height: "32px", boxSizing: "border-box" }}
          />
        </Autocomplete>
        {/* To location input */}
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
        {/* Display distance */}
        {distance && (
          <div style={{ marginTop: "8px" }}>Distance: {distance}</div>
        )}
      </div>
      <div style={{ width: "100%", height: "70vh", marginTop: "16px" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinate}
          zoom={13}
        >
          {/* Additional map components, like markers, can be added here */}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
