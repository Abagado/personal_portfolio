import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { IoMenu, IoClose } from "react-icons/io5";
import logo from "../assets/mushroom-64.png";
import sunIcon from "../assets/sun.png";
import moonIcon from "../assets/moon.png";
import { motion } from "framer-motion";

interface MenuItem {
  id: number;
  name: string;
  path: string;
}

const menu: MenuItem[] = [
  { id: 1, name: "HOME", path: "/" },
  { id: 2, name: "ABOUT", path: "/about" },
  { id: 3, name: "SKILLS", path: "/skills" },
  { id: 4, name: "PROJECTS", path: "/projects" },
  { id: 5, name: "CONTACT", path: "/contact" },
];

export const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`flex items-center fixed top-0 left-0 w-full justify-between border-b-[1px] z-50 px-5 transition-all
      ${theme === "light" ? "bg-green-200 text-black" : "bg-black text-white"}
    `}
    >
      {/* Логотип */}
      <div className="w-[90px] h-[90px] flex justify-center items-center bg-black">
        <img src={logo} className="p-3 w-[64px] h-[64px]" alt="Logo" />
      </div>

      {/* Навигационное меню для больших экранов */}
      <div className="hidden md:flex gap-10">
        {menu.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`cursor-pointer hover:underline font-medium transition ${
              location.pathname === item.path
                ? "text-green-600 dark:text-green-400 font-bold"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Кнопка переключения темы */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full"
        onClick={toggleTheme}
      >
        <img
          src={theme === "dark" ? sunIcon : moonIcon}
          alt="Toggle Theme"
          className="w-10 h-10"
        />
      </motion.button>
      {/* Бургер-меню (кнопка) */}
      <button className="md:hidden p-4" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
      </button>

      {/* Выпадающее меню для мобильных устройств */}
      {menuOpen && (
        <div
          className={`absolute top-[90px] left-0 w-full flex flex-col items-center py-5 transition-all
          ${
            theme === "light"
              ? "bg-green-200 text-black"
              : "bg-black text-white"
          }
        `}
        >
          {menu.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="py-3 text-lg font-medium transition hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
