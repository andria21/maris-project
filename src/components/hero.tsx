import React from "react";
// import HomeImage from "../../public/images/homescreen.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={
          "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        fill
        alt="Hero Image"
        style={{ objectFit: "cover" }}
      />
      <h1
        className={`
  absolute left-1/2 -translate-x-1/2
  text-4xl sm:text-5xl md:text-6xl lg:text-6xl
  bottom-10 sm:bottom-16 md:bottom-20 lg:bottom-26
  font-[600]
  text-center
  text-[rgb(222,222,222)]
  shadow-lg
  font-montserrat
  text-nowrap
`}
      >
        design & architecture
      </h1>
    </div>
  );
}
