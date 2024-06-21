"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to Uber-like Taxi Service
        </h1>
        <p className="text-lg text-center mb-6">
          Consider the problem in Uber or Ola where drivers demand extra fare
          over the metered amount. This app aims to solve that by recommending
          drivers the nearest areas with high order density. Stop being
          exploited by drivers saying "Udhar bada nahi milega!"
        </p>
        <p className="text-lg text-center mb-8">
          Join us today and experience fair pricing and efficient service.
        </p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </div>
  );
}
