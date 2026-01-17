"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Destinasi", path: "/destinasi" },
    { name: "Budaya", path: "/budaya" },
    { name: "Sejarah", path: "/sejarah" },
    { name: "Warga", path: "/warga" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pandeglang-white-100 bg-opacity-90 backdrop-blur-sm shadow-sm transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pandeglang-green-700 hover:text-pandeglang-green-900 transition-colors">
          Pandeglang
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-pandeglang-brown-700 hover:text-pandeglang-green-500 text-lg font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-pandeglang-brown-700" /> : <Menu className="h-6 w-6 text-pandeglang-brown-700" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-pandeglang-white-100 py-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-pandeglang-brown-700 hover:text-pandeglang-green-500 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;