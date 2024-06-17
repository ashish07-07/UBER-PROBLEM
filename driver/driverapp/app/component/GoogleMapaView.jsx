"use client ";
"use client ";
// import React from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { useLoadScript } from "@react-google-maps/api";

// export function GoogleMapView() {
//   const containerStyle = {
//     width: "100%",
//     height: "70vh",
//   };

//   const coordinate = { lat: 12.9141, lng: 74.856 };

//   return (
//     <useLoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={coordinate}
//         zoom={13}
//       ></GoogleMap>
//     </useLoadScript>
//   );
// }
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export function GoogleMapView() {
  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  const coordinate = { lat: 12.9141, lng: 74.856 };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinate}
        zoom={13}
      >
        {/* Additional map components, like markers, can be added here */}
      </GoogleMap>
    </LoadScript>
  );
}
