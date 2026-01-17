"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "#" },
    { name: "Tentang", href: "#identitas" },
    { name: "Destinasi", href: "#alam" },
    { name: "Budaya", href: "#budaya-sejarah" },
    { name: "Cerita", href: "#warga" },
    { name: "Peta", href: "#peta" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ease-in-out py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-serif font-bold text-pandeglang-white-100 drop-shadow-md hover:text-pandeglang-green-500 transition-colors">
          Pandeglang
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden md:flex flex-grow justify-center">
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-pandeglang-white-100 hover:text-pandeglang-green-500 text-lg font-medium transition-colors drop-shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Desktop CTA Button - Right aligned */}
        <div className="hidden md:flex">
          <Button
            asChild
            className="bg-pandeglang-white-100 hover:bg-pandeglang-white-200 text-pandeglang-green-700 text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            <a href="#identitas">Jelajahi Sekarang</a>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-7 w-7 text-pandeglang-white-100 drop-shadow-sm" /> : <Menu className="h-7 w-7 text-pandeglang-white-100 drop-shadow-sm" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-pandeglang-brown-900 bg-opacity-90 py-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-pandeglang-white-100 hover:text-pandeglang-green-500 text-lg font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              asChild
              className="bg-pandeglang-white-100 hover:bg-pandeglang-white-200 text-pandeglang-green-700 text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <a href="#identitas">Jelajahi Sekarang</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;