import React, { useState } from "react";
import { XMarkIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Dummy control for sign-in status

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 h-screen bg-dark text-white transform z-999 sidebar ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-64 shadow-lg flex flex-col justify-between`}
    >
      <div className="p-6">
        <div className="absolute top-4 right-4 md:hidden">
          <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        </div>

        <h2 className="text-xl font-bold tracking-wide">CompetiConnect</h2>

        <ul className="mt-8 space-y-2">
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
            My Competitions
          </li>
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
            Explore
          </li>
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
           Profile
          </li>
          {/* <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
            
          </li> */}
        </ul>
      </div>

      <div className="absolute bottom-4 left-0 w-full p-4 border-t border-gray-700">
        {isSignedIn ? (
          <>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-gray-400">johndoe@example.com</p>
            <button
              className="flex items-center gap-2 text-red-400 hover:text-red-300 mt-3"
              onClick={() => setIsSignedIn(false)} // Simulate logout
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Exit
            </button>
          </>
        ) : (
          <>
            <button
              className="w-full bg-red hover:bg-red text-white font-medium py-2 rounded-lg"
              onClick={() => setIsSignedIn(true)} // Simulate login
            >
              Login
            </button>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Sign in to continue
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
