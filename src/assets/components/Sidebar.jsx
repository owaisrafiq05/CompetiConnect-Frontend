import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMarkIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
} from "@heroui/react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isSignedIn, setIsSignedIn] = useState(false); // Dummy control for sign-in status
  const [userInfo, setUserInfo] = useState({ username: "", email: "" }); // State for user info
  const navigate = useNavigate(); // Initialize useNavigate
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const uid = document.cookie.split('; ').find(row => row.startsWith('userID='));
    if (uid) {
      const uidValue = uid.split('=')[1]; // Extract the uid value directly
      setIsSignedIn(true); // Check if token exists
      
      // Fetch user details from the API using the correct uid
      axios.get(`http://localhost:5000/auth/user/${uidValue}`) // Use uidValue directly in the URL
        .then(response => {
          if (response.data.message === "User details fetched successfully") {
            const { username, email } = response.data.data; // Extract username and email
            setUserInfo({ username, email }); // Set user info
          }
        })
        .catch(error => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/'; // Delete token from cookies
    document.cookie = 'userID=; Max-Age=0; path=/';
    setIsSignedIn(false); // Update sign-in status
    setUserInfo({ username: "", email: "" }); // Clear user info
    navigate('/login'); // Redirect to login page
  };

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
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
            <Link to="/competitions">My Competitions</Link>
          </li>
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
            <Link to="/explore">Explore</Link>
          </li>
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="p-3 rounded-lg cursor-pointer transition duration-200 bg-b-dark hover:bg-gray-700">
          <Link to="/competition-page">compname</Link>
          </li>
          <li><Button className="bg-red rounded-lg w-full mt-1 text-white" onClick={() => setIsModalOpen(true)}>
        Add Competition
      </Button></li>
        </ul>
      </div>

      

      <div className="absolute bottom-4 left-0 w-full p-4 border-t border-gray-700">
        {isSignedIn ? (
          <>
            <h3 className="text-lg font-semibold">{userInfo.username}  {userInfo.uid}</h3>
            <p className="text-sm text-gray-400">{userInfo.email}</p>
            <button
              className="flex items-center gap-2 text-red-400 hover:text-red-300 mt-3"
              onClick={handleLogout} // Call handleLogout on click
            >
              <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              Exit
            </button>
          </>
        ) : (
          <>
            <button
              className="w-full bg-red hover:bg-red text-white font-medium py-2 rounded-lg"
              onClick={() => {
                navigate('/login'); // Redirect to login page
              }} 
            >
              Login
            </button>
            <p className="text-sm text-gray-400 mt-2 text-center"
            onClick={() => {
              navigate('/signup'); // Redirect to login page
            }} >
              Sign in to continue
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
