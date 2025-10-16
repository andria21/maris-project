import React from "react";
// import HomeImage from "../../public/images/homescreen.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[16/9] max-[500px]:aspect-auto max-[500px]:h-screen">
      <Image
        src={
          "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        fill
        alt="Hero Image"
        className="object-cover"
      />
      <h1
        className={`
  absolute left-1/2 -translate-x-1/2
  text-4xl sm:text-4xl md:text-5xl lg:text-6xl
  bottom-10 sm:bottom-16 md:bottom-20 lg:bottom-26
  font-semibold
  text-center
  text-[rgb(222,222,222)]
  shadow-lg
  font-montserrat
  text-nowrap
  max-[445px]:text-wrap
`}
      >
        design & architecture
      </h1>
    </div>
  );
}
