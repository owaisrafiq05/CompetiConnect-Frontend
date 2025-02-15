import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const CompetitionCard = ({ comp }) => {
  return (
    <Card className="relative min-h-[250px] max-w-[350px] bg-dark text-white shadow-lg border-4 border-transparent animate-border rounded-xl 
      transition-all duration-300 ease-in-out hover:shadow-[0px_0px_20px_rgba(255,255,255,0.7)] hover:scale-105">

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
      <CardFooter>
        <p className="text-sm font-semibold">Entry Fee: <span className="text-red font-bold text-md">{comp.entryFee}</span></p>
      </CardFooter>
    </Card>
  );
};

export default CompetitionCard;
