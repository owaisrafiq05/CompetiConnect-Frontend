import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

const CompetitionPage = () => {
  const [activeTab, setActiveTab] = useState("problems");

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      author: "Admin",
      content: "Welcome to Code Clash!",
      timestamp: "2025-02-16",
    },
    {
      id: 2,
      author: "Admin",
      content: "Submit your solutions before midnight!",
      timestamp: "2025-02-15",
    },
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const isAdmin = true; // Change this to false for normal users

  const handlePostAnnouncement = () => {
    if (newAnnouncement.trim() !== "") {
      setAnnouncements([
        {
          id: Date.now(),
          author: "Admin",
          content: newAnnouncement,
          timestamp: new Date().toISOString().split("T")[0],
        },
        ...announcements,
      ]);
      setNewAnnouncement("");
    }
  };

  const tabs = [
    { key: "problems", label: "Problems" },
    { key: "rulebook", label: "Rulebook" },
    { key: "leaderboard", label: "Leaderboard" },
    { key: "announcements", label: "Announcements" },
  ];

  const competition = {
    title: "Code Clash",
    description: "A challenging JavaScript coding competition.",
    admin: "John Doe",
    info: "This competition tests your JavaScript skills in problem-solving, efficiency, and best practices. You will tackle a variety of problems ranging from algorithms to real-world coding scenarios. Ensure you read the rulebook and adhere to the competition guidelines for a fair play experience. Winners will be determined based on correctness, efficiency, and clarity of solutions.",
  };

  const leaderboardData = [
    { key: "1", name: "Alice Johnson", rank: "1", score: 95 },
    { key: "2", name: "Bob Smith", rank: "2", score: 90 },
    { key: "3", name: "Charlie Brown", rank: "3", score: 88 },
    { key: "4", name: "David Green", rank: "4", score: 80 },
  ];

  const columns = [
    { key: "name", label: "NAME" },
    { key: "rank", label: "RANK" },
    { key: "score", label: "SCORE" },
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 overflow-y-auto">
      {/* Competition Header */}
      <div className="bg-red text-white py-12 px-6 md:px-10">
        <h1 className="text-2xl md:text-4xl font-bold">{competition.title}</h1>
        <p className="text-sm md:text-lg mt-2">{competition.description}</p>
        <p className="text-sm md:text-md mt-1">
          <strong>Admin:</strong> {competition.admin}
        </p>
      </div>

      {/* Competition Info */}
      <div className="bg-white shadow-md px-6 md:px-10 py-10 border-b border-gray-300">
        <h2 className="text-lg md:text-xl font-semibold">Competition Info</h2>
        <p className="text-sm md:text-base text-gray-700 mt-2">
          {competition.info}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-md py-3 px-4">
        {/* Show tabs as buttons on larger screens */}
        <div className="hidden md:flex md:justify-center space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`py-2 px-6 text-lg font-medium border-b-4 transition-all ${
                activeTab === tab.key
                  ? "border-red-600 text-red-600 font-semibold"
                  : "border-transparent text-gray-500 hover:text-red-600"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Show dropdown on mobile screens */}
        <div className="md:hidden">
          <Select
            className="w-full"
            label="Select Tab"
            selectedKey={activeTab}
            onSelectionChange={(selection) => {
              const selectedKey = selection?.currentKey || selection; // Extract key if it's wrapped
              console.log("Selected Key:", selectedKey);
              setActiveTab(String(selectedKey));
            }}
          >
            {tabs.map((tab) => (
              <SelectItem key={tab.key}>{tab.label}</SelectItem>
            ))}
          </Select>
          <p>Active Tab: {activeTab}</p>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 px-6 md:px-10 py-6">
        {activeTab === "announcements" && (
          <div>
            {isAdmin && (
              <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Post an announcement..."
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                ></textarea>
                <button
                  className="mt-2 bg-red text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  onClick={handlePostAnnouncement}
                >
                  Post
                </button>
              </div>
            )}
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-300"
                >
                  <p className="font-semibold text-gray-800">
                    {announcement.author}
                  </p>
                  <p className="text-gray-700 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {announcement.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div>
            <div className="overflow-x-auto">
              <Table
                aria-label="Competition Leaderboard"
                className="border border-gray-300 shadow-md rounded-xl overflow-hidden"
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn className="bg-dark text-white p-3 font-semibold border-b border-gray-300">
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={leaderboardData}>
                  {(item) => (
                    <TableRow
                      key={item.key}
                      className="hover:bg-gray-100 transition"
                    >
                      {(columnKey) => (
                        <TableCell className="p-4 border-b border-gray-300 text-gray-700">
                          {getKeyValue(item, columnKey)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionPage;
