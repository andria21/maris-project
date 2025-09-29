"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import { ModeToggle } from "./mode-toggle";
import { useUser } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile menu toggle


  const { user, isAuthenticated } = useUser();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // don’t auto redirect
    // router.push("/"); // manually navigate
  };

  function CustomDp() {
    if (isAuthenticated)
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="outline">{user?.name || user?.email}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-2.5 px-8 flex items-center justify-between transition-all duration-500 flex-row-reverse md:flex-row ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-black"
      }`}
    >
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-8 tracking-wide text-gray-300 text-[12px]">
        <Link href="/interiors">Interiors</Link>
        <Link href="/exteriors">Exteriors</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/terms">Terms</Link>
      </div>

      {/* Logo */}
      <Link
        href="/"
        aria-label="Home"
        className="text-[16px] font-bold absolute left-1/2 -translate-x-1/2 cursor-pointer text-white -tracking-normal"
      >
        <h1>lavenrose</h1>
      </Link>

      <span className="md:hidden">
        <ModeToggle />
      </span>

      {/* Contact / Hamburger */}
      <div className="flex items-center">
        {/* Desktop Contact */}
        <div className="hidden md:block">
          <Button
            variant="default"
            size="sm"
            className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide text-[12px] cursor-pointer p-4 py-1.5 mr-2"
          >
            Contact Us
          </Button>
        </div>
        <span className="hidden md:block mr-2">
          <ModeToggle />
        </span>
        <div className={cn("hidden md:block", isAuthenticated && "mr-2")}>
          <CustomDp />
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed top-11 left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center space-y-4 py-4 z-40">
          <Link
            href="/interiors"
            onClick={() => setOpen(false)}
            className="text-white text-lg"
          >
            Interiors
          </Link>
          <Link
            href="/exteriors"
            onClick={() => setOpen(false)}
            className="text-white text-lg"
          >
            Exteriors
          </Link>
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="text-white text-lg"
          >
            Blog
          </Link>
          <Link
            href="/terms"
            onClick={() => setOpen(false)}
            className="text-white text-lg"
          >
            Terms
          </Link>
          <Button
            variant="default"
            size="lg"
            className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide"
          >
            Contact
          </Button>
          <CustomDp />
        </div>
      )}
    </nav>
  );
}
