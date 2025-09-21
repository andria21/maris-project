"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react"; // hamburger & close icons

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu toggle

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 p-3 px-8 flex items-center justify-between transition-all duration-500 ${
      scrolled ? "bg-black/80 backdrop-blur-md" : "bg-black"
    }`}>
      
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 tracking-wide text-gray-300">
        <Link href="/" className="text-sm">Interiors</Link>
        <Link href="/" className="text-sm">Exteriors</Link>
        <Link href="/" className="text-sm">Blog</Link>
        <Link href="/" className="text-sm">Terms</Link>
      </div>

      {/* Logo */}
      <h1 className="text-2xl text-white font-bold absolute left-1/2 -translate-x-1/2 tracking-tight font-normal">
        mari
      </h1>

      {/* Contact / Hamburger */}
      <div className="flex items-center space-x-2">
        {/* Desktop Contact */}
        <div className="hidden md:block">
          <Button variant="default" size="lg" className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide">
            Contact
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed top-12 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center space-y-4 py-4 z-40">
          <Link href="/" onClick={() => setOpen(false)} className="text-white text-lg">Interiors</Link>
          <Link href="/" onClick={() => setOpen(false)} className="text-white text-lg">Exteriors</Link>
          <Link href="/" onClick={() => setOpen(false)} className="text-white text-lg">Blog</Link>
          <Link href="/" onClick={() => setOpen(false)} className="text-white text-lg">Terms</Link>
          <Button variant="default" size="lg" className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide">
            Contact
          </Button>
        </div>
      )}
    </nav>
  );
}
