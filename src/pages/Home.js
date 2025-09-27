import React from "react";
import Carousel from "../components/Carousel";
import Register from "./Register";
import { Link } from "react-router-dom"; // ✅ import Link

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Section: Logo + Description */}
      <div className="flex flex-col md:flex-row items-center justify-center p-8 gap-12 w-full max-w-6xl mx-auto mt-8">
        {/* Logo */}
        <img
          src={`${process.env.PUBLIC_URL}/BillMate_Logo.png`}
          alt="BillMate Logo"
          className="w-56 h-56 md:w-64 md:h-64 rounded-lg shadow-lg"
        />

        {/* Description */}
        <div className="flex flex-col gap-6 max-w-lg text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-md">
            BillMate
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Track your expenses, split bills with friends, and enjoy a seamless experience
            managing your finances. Keep everything in one place and never miss a payment!
          </p>

          {/* ✅ Get Started navigates to /register */}
          {/* <Link
            to="/register"
            className="px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition text-lg font-semibold w-fit mx-auto md:mx-0"
          >
            Get Started
          </Link> */}
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-16 w-full px-4 md:px-0">
        <Carousel />
      </div>
    </div>
  );
}
