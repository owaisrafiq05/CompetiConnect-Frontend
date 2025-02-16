import React from 'react';

const Competition = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Competition</h1>

      <div className="flex gap-6">
        {/* My Competitions */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-md w-1/2">
          <h2 className="text-xl font-semibold mb-2">My Competitions</h2>
          <div className="text-gray-500">No competitions available.</div>
        </div>

        {/* My Joined Competitions */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-md w-1/2">
          <h2 className="text-xl font-semibold mb-2">My Joined Competitions</h2>
          <div className="text-gray-500">No joined competitions available.</div>
        </div>
      </div>
    </div>
  );
};

export default Competition;
