import React, { useState } from "react";
import Sidebar from "./assets/components/Sidebar";
import Navbar from "./assets/components/Navbar";
import Banner from "./assets/components/Banner";
import Cards from "./assets/components/Cards";
import Title from "./assets/components/Title"


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
          <Banner/>
          <div className="p-6">
          <Title subtitle="Join A Competition" title="Select a challenge and showcase your skills" />
          <Cards/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
