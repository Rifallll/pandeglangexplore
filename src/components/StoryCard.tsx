"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StoryCardProps {
  avatarSrc: string;
  name: string;
  story: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ avatarSrc, name, story }) => {
  return (
    <Card className="p-6 rounded-lg shadow-md bg-pandeglang-white-100 border-pandeglang-brown-100 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center text-center p-0">
        <Avatar className="h-20 w-20 mb-4 border-4 border-pandeglang-green-500">
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback className="bg-pandeglang-green-200 text-pandeglang-green-700 text-xl font-bold">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="text-lg italic text-pandeglang-brown-700 mb-4">"{story}"</p>
        <p className="font-semibold text-pandeglang-blue-700">- {name}</p>
      </CardContent>
    </Card>
  );
};

export default StoryCard;