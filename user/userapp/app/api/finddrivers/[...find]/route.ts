
import { NextRequest, NextResponse } from "next/server";
import redisClient from "./../../../../../../websocket/src/redisClient";

export async function GET(req: NextRequest, arg: any) {
  const params = arg.params.find;

  if (!params || params.length !== 3) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const [fromLat, fromLng, radius] = params;

  
  if (
    isNaN(parseFloat(fromLat)) ||
    isNaN(parseFloat(fromLng)) ||
    isNaN(parseFloat(radius))
  ) {
    return NextResponse.json(
      { error: "Invalid numeric parameters" },
      { status: 400 }
    );
  }

  try {
  
    const nearbyDrivers = await redisClient.georadius(
      "drivers",
      parseFloat(fromLng),
      parseFloat(fromLat),
      parseFloat(radius),
      "km",
      "WITHDIST",
      "ASC"
    );

    const driverIds = nearbyDrivers.map((driver: any) => ({
      id: driver[0],
      distance: driver[1],
    }));

    return NextResponse.json({ drivers: driverIds }, { status: 200 });
  } catch (error) {
    console.error("Error querying Redis for nearby drivers", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby drivers" },
      { status: 500 }
    );
  }
}
