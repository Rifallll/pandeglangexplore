"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "#tentang" },
    { name: "Destinasi", path: "#destinasi" },
    { name: "Budaya", path: "#budaya" },
    { name: "Cerita", path: "#cerita" },
    { name: "Peta", path: "#peta" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pandeglang-brown-900/70 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-pandeglang-white-100 hover:text-pandeglang-green-500 transition-colors">
          Pandeglang
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-pandeglang-white-100 hover:text-pandeglang-green-500 text-lg font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-pandeglang-green-500 hover:bg-pandeglang-green-600 text-pandeglang-white-100 text-base px-6 py-2 rounded-full shadow-md">
            <Link to="#destinasi">Jelajahi Sekarang</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-pandeglang-white-100" /> : <Menu className="h-6 w-6 text-pandeglang-white-100" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-pandeglang-brown-900/90 py-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-pandeglang-white-100 hover:text-pandeglang-green-500 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="bg-pandeglang-green-500 hover:bg-pandeglang-green-600 text-pandeglang-white-100 text-base px-6 py-2 rounded-full shadow-md">
              <Link to="#destinasi" onClick={() => setIsOpen(false)}>Jelajahi Sekarang</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;