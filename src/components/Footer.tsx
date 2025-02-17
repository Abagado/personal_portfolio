import React from "react";
import {IoLogoDiscord, IoLogoVk, IoLogoGithub, IoLogoWhatsapp, IoPaperPlane,} from "react-icons/io5";
import { useTheme } from "../context/ThemeContext"; 

export const Footer = () => {
  const { theme } = useTheme(); 

  return (
    <footer
      className={`w-full border-t-[1px] flex flex-col items-center py-5 transition-all ${
        theme === "dark" ? "bg-black text-white" : "bg-green-200 text-gray-600"
      }`}
    >
      <div className="flex gap-7 text-[20px]">
        <IoLogoGithub className="cursor-pointer hover:scale-110 transition-all ease-in-out" />
        <IoLogoDiscord className="cursor-pointer hover:scale-110 transition-all ease-in-out" />
        <IoLogoVk className="cursor-pointer hover:scale-110 transition-all ease-in-out" />
        <IoLogoWhatsapp className="cursor-pointer hover:scale-110 transition-all ease-in-out" />
        <IoPaperPlane className="cursor-pointer hover:scale-110 transition-all ease-in-out" />
      </div>
      <p className="text-sm mt-4">
        © {new Date().getFullYear()} Все права защищены
      </p>
    </footer>
  );
};
