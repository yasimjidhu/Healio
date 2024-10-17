import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-primary-gray p-6 flex flex-col md:flex-row justify-between items-center">
      <div className="">
        <h2 className="text-xl font-bold text-white">Healio</h2>
      </div>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <h6 className="text-lg text-white hover:text-primary-medium  cursor-pointer">Prior Authentication</h6>
        <Link to='/dashboard'><h6 className="text-lg text-white hover:text-primary-medium  cursor-pointer">Dashboard</h6></Link>
      </div>
    </nav>
  );
};