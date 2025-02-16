import React from "react";
import JoinCard from "../assets/components/JoinCard";

const Competition = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">My Competition</h1>

      <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
    
        <div className="border border-gray-300 p-4 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
            My Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <JoinCard />
            <JoinCard />
            <JoinCard />
            <JoinCard />
          </div>
        </div>

        
        <div className="border border-gray-300 p-4 rounded-lg shadow-md w-full ">
          <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
            My Joined Competitions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <JoinCard />
            <JoinCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competition;
