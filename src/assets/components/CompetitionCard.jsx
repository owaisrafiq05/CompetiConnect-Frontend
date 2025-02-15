import React, { useState } from "react";
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

const CompetitionCard = ({ comp }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleFileChange = (event) => {
    console.log("Selected file:", event.target.files[0]);
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
          <Button className="bg-red rounded-lg" onClick={() => setIsModalOpen(true)}>Join Now</Button>
        </CardFooter>
      </Card>
      
      {/* ✅ Fix: Use NextUI Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} className="bg-white rounded-lg">
        <ModalContent>
          <ModalHeader>Upload Your File</ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-600 mb-3">Please select a file to upload for this competition.</p>
            <Input type="file" onChange={handleFileChange} className="border border-gray-300 rounded-md p-2 w-full" />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="bg-red rounded-lg text-white"  onClick={() => setIsModalOpen(false)}>Upload</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompetitionCard;
