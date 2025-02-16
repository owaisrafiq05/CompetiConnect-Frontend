import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "sonner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

const CompetitionPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("problems");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [competition, setCompetition] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/comp/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch competition data");
        }
        const data = await response.json();
        setCompetition(data.competition);
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching competition data");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [id]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/comp/${id}/participants/leaderboard`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboard(data.participants || []);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        toast.error("Error fetching leaderboard data");
      }
    };

    if (activeTab === "leaderboard") {
      fetchLeaderboard();
    }
  }, [id, activeTab]);


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/comp/${id}/announcements`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data.announcements || []);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        toast.error("Error fetching announcements");
      }
    };

    if (activeTab === "announcements") {
      fetchAnnouncements();
    }
  }, [id, activeTab]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading:", selectedFile);
      setIsModalOpen(false);
    } else {
      toast.error("Please select a file first!");
    }
  };

  const tabs = [
    { key: "applications", label: "Applications" },
    { key: "problems", label: "Problems" },
    { key: "rulebook", label: "Rulebook" },
    { key: "leaderboard", label: "Leaderboard" },
    { key: "announcements", label: "Announcements" },
  ];

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (!competition) {
    return <div className="p-6 text-center">Competition not found</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100 overflow-y-auto">
      <Toaster />
      {/* Competition Header */}
      <div className="bg-red text-white py-12 px-6 md:px-10">
        <h1 className="text-2xl md:text-4xl font-bold">
          {competition.compName}
        </h1>
        <p className="text-sm md:text-lg mt-2">{competition.compDescription}</p>
        <p className="text-sm md:text-md mt-1">
          <strong>Admin:</strong> {competition.compOwnerUserId.username}
        </p>
      </div>

      {/* Competition Info */}
      <div className="bg-white shadow-md px-6 md:px-10 py-10 border-b border-gray-300">
        <h2 className="text-lg md:text-xl font-semibold">Competition Info</h2>
        <p className="text-sm md:text-base text-gray-700 mt-2">
          {competition.compDescription}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-md py-3 px-4">
        {/* Show tabs as buttons on larger screens */}
        <div className="max-[869px]:hidden flex justify-center space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`py-2 px-6 text-md font-medium border-b-4 transition-all ${
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
        <div className="min-[870px]:hidden flex w-full flex-wrap">
          <Select
            className="w-full border-1 rounded-lg"
            selectedKey={activeTab}
            onSelectionChange={(selection) => {
              const selectedKey = selection?.currentKey || selection;
              setActiveTab(String(selectedKey));
            }}
          >
            {tabs.map((tab) => (
              <SelectItem
                key={tab.key}
                className="bg-red text-white rounded-lg"
              >
                {tab.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button
          className="bg-red rounded-lg w-32 mr-auto text-white"
          onClick={() => setIsModalOpen(true)}
        >
          Submit
        </Button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 px-6 md:px-10 py-6">
        {activeTab === "announcements" && (
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-300"
              >
                <p className="font-semibold text-gray-800">
                  {competition.compOwnerUserId.username}
                </p>
                <p className="text-gray-700 mt-1">{announcement}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            ))}
            {announcements.length === 0 && (
              <div className="text-center text-gray-500">
                No announcements yet
              </div>
            )}
          </div>
        )}

        {activeTab === "problems" && (
          <div className="prose max-w-none">{competition.problemStatement}</div>
        )}

        {activeTab === "rulebook" && (
          <div className="prose max-w-none whitespace-pre-line">
            {competition.compRuleBook}
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            <div className="overflow-x-auto">
              <Table
                aria-label="Competition Leaderboard"
                className="border border-gray-300 shadow-md rounded-xl overflow-hidden"
              >
                <TableHeader>
                  <TableColumn className="bg-dark text-white p-3 font-semibold">
                    NAME
                  </TableColumn>
                  <TableColumn className="bg-dark text-white p-3 font-semibold">
                    ACTIONS
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((entry) => (
                    <TableRow
                      key={entry.participant._id}
                      className="hover:bg-gray-100 transition"
                    >
                      <TableCell className="p-4 border-b border-gray-300 text-gray-700">
                        {entry.participant.username}
                      </TableCell>
                      <TableCell className="p-4 border-b border-gray-300 text-gray-700">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition">
                          Accept
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                <TableHeader>
                  <TableColumn className="bg-dark text-white p-3 font-semibold">
                    NAME
                  </TableColumn>
                  <TableColumn className="bg-dark text-white p-3 font-semibold">
                    SCORE
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((entry) => (
                    <TableRow
                      key={entry.participant._id}
                      className="hover:bg-gray-100 transition"
                    >
                      <TableCell className="p-4 border-b border-gray-300 text-gray-700">
                        {entry.participant.username}
                      </TableCell>
                      <TableCell className="p-4 border-b border-gray-300 text-gray-700">
                        {entry.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* File Upload Modal */}
      <Modal
        className="bg-white rounded-lg"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Upload Your Solution</ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Submission Rules</h3>
              <div className="text-sm text-gray-600 whitespace-pre-line">
                {competition.submissionRules}
              </div>
            </div>
            <input
              type="file"
              className="border p-2 w-full rounded-lg"
              onChange={handleFileChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-gray-500"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red text-white rounded-lg"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CompetitionPage;
