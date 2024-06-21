"use client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  let count = 0;

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Uber Driver
        </h1>
        <p className="text-lg text-gray-200 mb-8 text-center">
          Join our community of drivers and start earning on your own schedule.
        </p>
        <button
          onClick={function () {
            signIn();
          }}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
