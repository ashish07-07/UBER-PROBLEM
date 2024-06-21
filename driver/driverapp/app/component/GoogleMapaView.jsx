"use client ";
"use client ";

import React from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";

export function GoogleMapView({ center }) {
  const containerStyle = {
    width: "100%",
    height: "70vh",
  };

  const coordinate = { lat: 12.9141, lng: 74.856 };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        
      </GoogleMap>
    </LoadScript>
  );
}
