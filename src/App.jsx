import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./assets/components/Sidebar";
import Navbar from "./assets/components/Navbar";
import Competition from "./pages/Competition";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Home from "./pages/Home"; // ✅ FIX: Import Home

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto bg-gray-100">
        {/* Navbar for Mobile */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} /> {/* ✅ Home Route Fixed */}
            <Route path="/competitions" element={<Competition />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
