"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import EditForm from "./EditForm";

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
  editHandler?: (id: string, formData: FormData) => void | Promise<void>;
  id?: string;
  projectId?: string | undefined;
  isLink?: boolean;
};

export default ProjectCard;
function ProjectCard({
  image,
  title,
  description,
  pages,
  deleteHandler,
  id,
  projectId,
  isLink,
  editHandler,
}: ProjectCardProps) {
  const { isAuthenticated } = useUser();
  return (
    <div className="w-full relative">
      {pages?.interiors && isAuthenticated && (
        <Button
          variant={"outline"}
          className="cursor-pointer absolute z-20 left-2 top-2 hover:bg-input/90 dark:hover:bg-foreground/50"
          onClick={() => deleteHandler?.(id!)}
        >
          <X className="h-6 w-6" />
        </Button>
      )}

      {pages?.interiors && isAuthenticated && (
        <EditForm id={id!} handleEditAction={editHandler} />
      )}

      {isLink ? (
        <Link href={projectId ?? ""}>
          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9] group">
            <Image
              src={image}
              alt="Image 1"
              fill
              className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
            />
          </div>
        </Link>
      ) : (
        <div className="relative w-full h-80 sm:aspect-[4/3] md:aspect-[16/9] group">
          <Image
            src={image}
            alt="Image 1"
            fill
            className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
          />
        </div>
      )}

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
