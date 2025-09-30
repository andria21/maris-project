import React from "react";
import { Mail, Phone, Globe } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer>
      <div className="grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-6 pb-30 font-montserrat">
        <div>
          <span className="flex gap-2">
            <Globe className="w-6 h-6" />
            <h1 className="text-[18px] font-[600] tracking-wide">
              Tbilisi, Georgia
            </h1>
          </span>
          <p className="pt-2 leading-tight text-[12px] text-[#898989]">
            Feel free to reach out <br />
            and schedule a meeting
          </p>
        </div>
        <div>
          <span className="flex gap-2">
            <Phone className="w-6 h-6" />
            <h1 className="text-[18px] font-[600] tracking-wide">
              +995 (555) 55-55-55
            </h1>
          </span>
          <p className="text-[14px] pt-8 pb-4">Contact me:</p>
          <div className="flex gap-2">
            <Button
              variant="default"
              size="lg"
              className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide text-[10px] cursor-pointer p-4 py-1.5 px-6 hover:bg-white hover:text-black antialiased"
            >
              Telegram
            </Button>
            <Button
              variant="default"
              size="lg"
              className="bg-blue-500 rounded-3xl text-white font-medium tracking-wide text-[10px] cursor-pointer p-4 py-1.5 px-6 hover:bg-white hover:text-black antialiased"
            >
              WhatsApp
            </Button>
          </div>
        </div>
        <div>
          <span className="flex gap-2">
            <Mail className="w-6 h-6" />
            <h1 className="text-[18px] font-[600] tracking-wide">
              test@gmail.com
            </h1>
          </span>
          <p className="text-[14px] pt-8 pb-4">Socials</p>
          <div className="flex gap-2 justify-center sm:justify-start">
            <FaFacebook
              className="w-7 h-7 cursor-pointer  transform transition-transform duration-300 
                   hover:scale-110 hover:rotate-6"
            />
            <FaInstagram
              className="w-7 h-7 cursor-pointer  transform transition-transform duration-300 
                   hover:scale-110 hover:rotate-6"
            />
          </div>
        </div>
      </div>
      <p className="text-center text-[12px] text-[#6e6e6e] pb-6 ">
        © «lavenrose», 2025
      </p>
    </footer>
  );
}
