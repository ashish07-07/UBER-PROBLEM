"use client";
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

// pages/finddrivers.ts
import { useState, useEffect } from "react";

const FindDrivers = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const fromLat = 12.9141417;
  const fromLng = 74.8559568;
  const radius = 5;

  useEffect(() => {
    const fetchDrivers = async () => {
      const fetchedDrivers = await fetchNearbyDrivers(fromLat, fromLng, radius);
      setDrivers(fetchedDrivers);
    };

    fetchDrivers();
  }, []);

  return (
    <div>
      <h2>Nearby Drivers</h2>
      {drivers.length === 0 ? (
        <p>No drivers found within the specified radius.</p>
      ) : (
        <ul>
          {drivers.map((driver) => (
            <li key={driver.id}>
              Driver ID: {driver.id}, Distance: {driver.distance} km
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FindDrivers;
