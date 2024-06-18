// "use client";
// import { useEffect, useState } from "react";

// import { GoogleMapView } from "../component/GoogleMapaView";
// import { useSession } from "next-auth/react";
// import { NEXT_AUTH } from "../lib/auth";
// import { Session } from "inspector";

// export default function DriverDashboard() {
//   const [location, setLocation] = useState({ lat: 20.9141, lng: 74.856 });
//   const [ws, setWs] = useState<WebSocket | null>(null);
//   const { data: session, status } = useSession();
//   // console.log(session);

//   // const id: any = JSON.stringify(session?.user.id);
//   // console.log(id);

//   const id = session?.user?.id;

//   useEffect(() => {
//     // Establish WebSocket connection
//     const socket = new WebSocket("ws://localhost:8080"); // Replace with your WebSocket server URL
//     setWs(socket);

//     console.log("checking id");
//     console.log(id);

//     if (id) {
//       return <div> Loading</div>;
//     } else {
//       console.log("nahi bhai id hey");
//       console.log(id);
//     }

//     socket.onopen = () => {
//       console.log("WebSocket connection opened");
//       // Register the driver with the server
//       socket.send(
//         JSON.stringify({
//           type: "register",
//           clientType: "driver",
//           clientId: id, // Replace with the actual driver ID
//         })
//       );
//     };

//     socket.onmessage = (event) => {
//       // Handle incoming messages if needed
//       console.log("Message from server: ", event.data);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ lat: latitude, lng: longitude });

//           // Send location to WebSocket server
//           if (ws) {
//             ws.send(
//               JSON.stringify({
//                 type: "locationUpdate",
//                 clientType: "driver",
//                 clientId: id, // Replace with the actual driver ID
//                 latitude: latitude,
//                 longitude: longitude,
//               })
//             );
//           }
//         },
//         (error) => {
//           console.log("Error while getting location", error);
//         },
//         { enableHighAccuracy: true }
//       );

//       return () => {
//         navigator.geolocation.clearWatch(watchId);
//       };
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, [ws]);

//   return (
//     <div>
//       <GoogleMapView center={location} />
//       <div>
//         {"My location is: "}
//         {location.lat}, {location.lng}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { GoogleMapView } from "../component/GoogleMapaView";
import { useSession } from "next-auth/react";

export default function DriverDashboard() {
  const [location, setLocation] = useState({ lat: 20.9141, lng: 74.856 });
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { data: session, status } = useSession();
  const id = session?.user?.id;

  useEffect(() => {
    // Wait until the session is authenticated and the id is available
    if (status === "authenticated" && id) {
      const socket = new WebSocket("ws://localhost:8080");
      setWs(socket);

      socket.onopen = () => {
        console.log("WebSocket connection opened");
        socket.send(
          JSON.stringify({
            type: "register",
            clientType: "driver",
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
    } else {
      console.log("Driver ID is not available yet.");
    }
  }, [status, id]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          if (ws) {
            ws.send(
              JSON.stringify({
                type: "locationUpdate",
                clientType: "driver",
                clientId: id,
                latitude: latitude,
                longitude: longitude,
              })
            );
          }
        },
        (error) => {
          console.log("Error while getting location", error);
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [ws, id]);

  return (
    <div>
      <GoogleMapView center={location} />
      <div>
        {"My location is: "}
        {location.lat}, {location.lng}
      </div>
    </div>
  );
}
