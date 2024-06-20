// import { NextRequest, NextResponse } from "next/server";

// export function GET(req: NextRequest, arg: any) {
//   const arguements = arg.params.find;

//   console.log(arguements);

//   return NextResponse.json(
//     {
//       mesage: "testing the arguements",
//     },
//     {
//       status: 200,
//     }
//   );
// }

// import { NextRequest, NextResponse } from "next/server";

// import redisClient from "./../../../../../../websocket/src/redisClient";

// export async function GET(req: NextRequest, arg: any) {
//   const arguments = arg.params.find;

//   if (!arguments || arguments.length !== 3) {
//     return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
//   }

//   const [fromLat, fromLng, radius] = arguments;

//   // Validate parameters
//   if (
//     isNaN(parseFloat(fromLat)) ||
//     isNaN(parseFloat(fromLng)) ||
//     isNaN(parseFloat(radius))
//   ) {
//     return NextResponse.json(
//       { error: "Invalid numeric parameters" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch nearby drivers from Redis
//     const nearbyDrivers = await redisClient.georadius(
//       "drivers",
//       parseFloat(fromLng),
//       parseFloat(fromLat),
//       parseFloat(radius),
//       "km",
//       "WITHDIST",
//       "ASC"
//     );

//     const driverIds = nearbyDrivers.map((driver: any) => ({
//       id: driver[0],
//       distance: driver[1],
//     }));

//     return NextResponse.json({ drivers: driverIds }, { status: 200 });
//   } catch (error) {
//     console.error("Error querying Redis for nearby drivers", error);
//     return NextResponse.json(
//       { error: "Failed to fetch nearby drivers" },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import redisClient from "./../../../../../../websocket/src/redisClient"; // Adjust the path as per your project structure

// export async function GET(req: NextRequest, arg: any) {
//   const arguments = arg.params.find;

//   if (!arguments || arguments.length !== 3) {
//     return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
//   }

//   const [fromLat, fromLng, radius] = arguments;

//   // Validate parameters
//   const fromLatNum = parseFloat(fromLat);
//   const fromLngNum = parseFloat(fromLng);
//   const radiusNum = parseFloat(radius);

//   if (isNaN(fromLatNum) || isNaN(fromLngNum) || isNaN(radiusNum)) {
//     return NextResponse.json(
//       { error: "Invalid numeric parameters" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Fetch nearby drivers from Redis
//     const nearbyDrivers = await redisClient.georadius(
//       "drivers",
//       fromLngNum,
//       fromLatNum,
//       radiusNum,
//       "km",
//       "WITHDIST",
//       "ASC"
//     );

//     const driverIds = nearbyDrivers.map((driver: any) => ({
//       id: driver[0],
//       distance: driver[1],
//     }));

//     return NextResponse.json({ drivers: driverIds }, { status: 200 });
//   } catch (error) {
//     console.error("Error querying Redis for nearby drivers", error);
//     return NextResponse.json(
//       { error: "Failed to fetch nearby drivers" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import redisClient from "./../../../../../../websocket/src/redisClient";

export async function GET(req: NextRequest, arg: any) {
  const params = arg.params.find;

  if (!params || params.length !== 3) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const [fromLat, fromLng, radius] = params;

  // Validate parameters
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
    // Fetch nearby drivers from Redis
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
