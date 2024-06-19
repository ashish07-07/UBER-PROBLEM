"use client";
import React, { useState } from "react";

import LocationAutocomplete from "../components/Autocomplete";

const Dashboard: React.FC = () => {
  const [fromLocation, setFromLocation] = useState<{
    address: string;
    latLng: { lat: number; lng: number };
  } | null>(null);
  const [toLocation, setToLocation] = useState<{
    address: string;
    latLng: { lat: number; lng: number };
  } | null>(null);

  const handleFromSelect = (
    address: string,
    latLng: { lat: number; lng: number }
  ) => {
    setFromLocation({ address, latLng });
  };

  const handleToSelect = (
    address: string,
    latLng: { lat: number; lng: number }
  ) => {
    setToLocation({ address, latLng });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <LocationAutocomplete label="From" onSelectAddress={handleFromSelect} />
      <LocationAutocomplete label="To" onSelectAddress={handleToSelect} />
      <div>
        <h2>Selected Locations:</h2>
        {fromLocation && (
          <p>
            From: {fromLocation.address} ({fromLocation.latLng.lat},{" "}
            {fromLocation.latLng.lng})
          </p>
        )}
        {toLocation && (
          <p>
            To: {toLocation.address} ({toLocation.latLng.lat},{" "}
            {toLocation.latLng.lng})
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
