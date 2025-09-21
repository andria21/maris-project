import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navigation() {
  return (
    <nav className="w-full p-2 bg-black text-white flex justify-between items-center px-8">
      <div className="flex space-x-8 tracking-wide text-gray-300">
        <Link href="/" className="text-md">
          Interiors
        </Link>
        <Link href="/" className="text-md">
          Exteriors
        </Link>
        <Link href="/" className="text-md">
          Blog
        </Link>
        <Link href="/" className="text-md">
          Terms
        </Link>
      </div>
      <h1 className="text-2xl font-bold absolute left-1/2 -translate-x-1/2 tracking-tight font-normal">mari</h1>
      <Button variant="default" size="lg" className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide">Contact</Button>
    </nav>
  );
}
