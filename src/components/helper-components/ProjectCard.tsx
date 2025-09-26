"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

import { X } from "lucide-react";
import { Button } from "../ui/button";

type Pages = {
  interiors: string;
  exteriors: string;
};

type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  pages?: Pages;
  deleteHandler?: (id: string) => void;
  id?: string;
};

export default ProjectCard;
function ProjectCard({
  image,
  title,
  description,
  pages,
  deleteHandler,
  id,
}: ProjectCardProps) {
  return (
    <div className="w-full relative">
      {pages?.interiors && (
        <Button
          variant={"destructive"}
          className="cursor-pointer absolute z-20"
          onClick={() => deleteHandler?.(id!)}
        >
          <X className="h-6 w-6" />
        </Button>
      )}
      <div className="relative w-full h-80 sm:h-90 md:h-96 lg:h-[425px] group">
        <Image
          src={image}
          alt="Image 1"
          fill
          className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
        />
      </div>

      <h1
        className={cn(
          "mt-6 md:pl-12 pl-6 font-medium text-2xl ",
          pages?.interiors && "md:text-4xl text-2xl font-montserrat font-[600]"
        )}
      >
        {title}
      </h1>
      <p className="text-gray-400 mt-1 md:pl-12 pl-6 text-md font-light font-montserrat">
        {description}
      </p>
    </div>
  );
}
