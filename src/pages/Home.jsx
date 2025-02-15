import React, { useState } from "react";

import Banner from "../assets/components/Banner";
import Cards from "../assets/components/Cards";
import Title from "../assets/components/Title"


const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className="flex">
    //   {/* Sidebar */}
    //   <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

    //   {/* Main Content Area */}
    //   <div className="flex-1 h-screen overflow-y-auto bg-gray-100">
    //     {/* Navbar for Mobile */}
    //     <Navbar toggleSidebar={toggleSidebar} />

    //     {/* Page Content */}
        <div>
          <Banner/>
          <div className="p-6">
          <Title subtitle="Join A Competition" title="Select a challenge and showcase your skills" />
          <Cards/>
          </div>
        </div>

  );
};

export default Home;
