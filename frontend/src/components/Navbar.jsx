import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { logout, error ,user} = useAuth(); 
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout()
    navigate('/')
  };

  return (
    <nav className="bg-primary-gray shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h2 className="text-2xl font-bold text-white hover:text-primary-medium transition duration-300">Healio</h2>
            </Link>
          </div>
          <div className="hidden md:block">
            {user && (
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/dashboard" className="text-white hover:bg-primary-medium hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="text-white bg-primary-dark hover:bg-primary-dark px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen &&  (
        <div className="md:hidden">
          {user && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="text-white hover:bg-primary-medium hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="text-white bg-primary-dark hover:bg-primary-gray  w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
          )}
        </div>
      )}
    </nav>
  );
};