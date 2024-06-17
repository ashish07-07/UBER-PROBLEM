"use client";
import { useEffect, useState } from "react";
import { GoogleMapView } from "../component/GoogleMapaView";
import { error } from "console";
export default function () {
  const [location, setlocation] = useState({ lat: 12.9141, lng: 74.856 });
  console.log(navigator.geolocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setlocation({ lat: latitude, lng: longitude });
        },

        (error) => {
          console.log("error while getting location", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div>
      {<GoogleMapView center={location}></GoogleMapView>}

      {"my location is "}
      {location.lat}
      {location.lng}
    </div>
  );
}
