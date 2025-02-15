import React from "react";
import CompetitionCard from "./CompetitionCard";

const competitions = [
  {
    id: 1,
    name: "Code Clash",
    description: "A coding competition for JavaScript developers.",
    admin: "John Doe",
    entryFee: "$10",
    isPrivate: false,
  },
  {
    id: 2,
    name: "AI Challenge",
    description: "Compete in AI and Machine Learning challenges.",
    admin: "Sarah Lee",
    entryFee: "Free",
    isPrivate: true,
  },
  {
    id: 3,
    name: "Design Sprint",
    description: "A UI/UX design competition with real-world challenges.",
    admin: "Emma Smith",
    entryFee: "$5",
    isPrivate: false,
  },
];

const Cards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {competitions.map((comp) => (
        <CompetitionCard key={comp.id} comp={comp} />
      ))}
    </div>
  );
};

export default Cards;
