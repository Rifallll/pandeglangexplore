"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ imageSrc, title, description, link }) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-pandeglang-white-100 border-pandeglang-green-100">
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-pandeglang-green-700">{title}</CardTitle>
        <CardDescription className="text-pandeglang-brown-500">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end pb-4">
        <Button asChild className="bg-pandeglang-blue-500 hover:bg-pandeglang-blue-600 text-pandeglang-white-100">
          <a href={link} target="_blank" rel="noopener noreferrer">
            Lihat Detail
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;