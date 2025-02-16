import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@heroui/react"; 
import { LockClosedIcon } from "@heroicons/react/24/solid";

const JoinCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dummy data
  const comp = {
    id: 1,
    name: "Sample Competition",
    admin: "John Doe",
    description: "This is a sample competition for testing purposes.",
    entryFee: "Free",
    isPrivate: true, // Change to false for public competition
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleJoinCompetition = async () => {
    setLoading(true);

    setTimeout(() => {
      toast.success(comp.isPrivate ? "Successfully joined private competition!" : "Successfully joined competition!");
      setIsModalOpen(false);
      setSelectedFile(null);
      setLoading(false);
      navigate(`/competition-page/${comp.id}`);
    }, 1000); // Simulating API delay
  };

  const handleJoinClick = () => {
    if (comp.isPrivate) {
      setIsModalOpen(true);
    } else {
      handleJoinCompetition();
    }
  };

  return (
    <>
      <Card className="relative min-h-[280px] max-w-[350px] bg-dark text-white shadow-lg border-4 border-transparent animate-border rounded-xl 
        transition-all duration-300 ease-in-out hover:shadow-[0px_0px_20px_rgba(255,255,255,0.7)] hover:scale-105 p-4">
      
        {comp.isPrivate && (
          <LockClosedIcon className="w-6 h-6 text-red-500 absolute top-3 right-3" />
        )}

        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-bold">{comp.name}</p>
            <p className="text-sm text-gray-400">Admin: {comp.admin}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm">{comp.description}</p>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm font-semibold">
            Entry Fee: <span className="text-red font-bold text-md">{comp.entryFee}</span>
          </p>

        </CardFooter>
      </Card>

    </>
  );
};

export default JoinCard;
