import React from "react";
import { useTheme } from "../context/ThemeContext";

export const Introduction=()=> {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center flex-col items-center relative z-10">
      <div className="h-[100px] border-r-[1px] mt-[-20px]" />
      <div className="w-[10px] h-[10px] bg-green-600 rounded-full"></div>
      <h2
        className={`mt-5${theme === "light" ? " text-black" : " text-white"} font-medium text-[13px]
         tracking-widest`}
      >
        ПРИВЕТ! МЕНЯ ЗОВУТ
      </h2>
      <div className="text-center mt-5">
        <h2 className={`text-[60px] font-bold${theme === "light" ? " text-black" : " text-white"} tracking-widest`}>
          СОКИРКИНА
        </h2>
        <h2 className={`text-[60px] font-bold ${theme === "light" ? " text-black" : " text-white"} tracking-widest`}>
          ДИАНА
        </h2>
      </div>
      <img
        src="src/assets/avatar.jpg"
        alt="Avatar"
        className="w-[160px] h-[160px] bg-gray-200 p-7 rounded-full mt-7 object-cover"
      />
    </div>
  );
};
