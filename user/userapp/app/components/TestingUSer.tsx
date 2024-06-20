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

"use client";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { useSession } from "next-auth/react";

export function UserInput() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ["places", "geometry"],
  });

  const [from, setFrom] = useState<google.maps.places.Autocomplete | null>(
    null
  );
  const [to, setTo] = useState<google.maps.places.Autocomplete | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const session = useSession();
  const id = session.data?.user.id;
  console.log(id);

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
      console.log(place.address_components);
    } else {
      console.log("Error: From location autocomplete instance is null");
    }
  }

  function onPlaceChangedTo() {
    if (to !== null) {
      const place = to.getPlace();
      console.log(place);

      calculateDistance();
    } else {
      console.log("Error: To location autocomplete instance is null");
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
      console.log("Calculating distance between:");
      console.log("From:", fromLocation.geometry.location.toString());
      console.log("To:", toLocation.geometry.location.toString());

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
            console.log("Distance calculated:", distanceText);
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

  return isLoaded ? (
    <div className="flex items-center justify-center min-h-screen bg-grey-800">
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
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-white">Loading...</div>
    </div>
  );
}
