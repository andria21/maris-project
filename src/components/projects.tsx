import Image from "next/image";
import React from "react";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex justify-between w-full pt-50 pb-30">
        <div className="w-full">
          <div className="relative w-full h-130 group">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt="Image 1"
              className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
            />
          </div>
          <h1 className="text-white mt-6 pl-12 font-medium text-2xl">SPIRES</h1>
          <p className="text-gray-400 mt-1 pl-12 text-md font-light">2025 Tbilisi 150 m2</p>
        </div>
        <div className="w-full">
          <div className="relative w-full h-130 group">
            <Image
              src="https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt="Image 2"
              className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
            />
          </div>
          <h1 className="text-white mt-6 pl-12 font-medium text-2xl">BLACK LINE HOUSE</h1>
          <p className="text-gray-400 mt-1 pl-12 text-md font-light">2025 Tbilisi 150 m2</p>
        </div>
      </div>
      <div className="flex justify-between w-full pb-50">
        <div className="w-full">
          <div className="relative w-full h-130 group">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt="Image 1"
              className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
            />
          </div>
          <h1 className="text-white mt-6 pl-12 font-medium text-2xl">SPIRES</h1>
          <p className="text-gray-400 mt-1 pl-12 text-md font-light">2025 Tbilisi 150 m2</p>
        </div>
        <div className="w-full">
          <div className="relative w-full h-130 group">
            <Image
              src="https://images.unsplash.com/photo-1606744824163-985d376605aa?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt="Image 2"
              className="object-cover transition-opacity duration-1000 group-hover:opacity-50 cursor-pointer"
            />
          </div>
          <h1 className="text-white mt-6 pl-12 font-medium text-2xl">BLACK LINE HOUSE</h1>
          <p className="text-gray-400 mt-1 pl-12 text-md font-light">2025 Tbilisi 150 m2</p>
        </div>
      </div>
    </div>
  );
}
