"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-pandeglang-brown-700 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-pandeglang-brown-500 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;