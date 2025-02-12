import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/mushroom-64.png"; // Импортируем логотип как модуль

// Интерфейс для пунктов меню
interface MenuItem {
  id: number;
  name: string;
  path: string;
}

// Статический массив меню вынесен за пределы компонента
const menu: MenuItem[] = [
  { id: 1, name: "HOME", path: "/" },
  { id: 2, name: "ABOUT", path: "/about" },
  { id: 3, name: "SKILLS", path: "/skills" },
  { id: 4, name: "PROJECTS", path: "/projects" },
  { id: 5, name: "CONTACT", path: "/contact" },
];

export const Header = () => {
  const location = useLocation(); 

  return (
    <div className="flex items-center fixed top-0 left-0 w-full justify-between border-b-[1px] bg-green-200 z-50">
      {/* Логотип */}
      <div className="w-[90px] h-[90px] flex justify-center items-center bg-black">
        <img src={logo} className="p-3 w-[64px] h-[64px]" alt="Logo" />
      </div>

      {/* Навигационное меню */}
      <div className="hidden md:flex gap-14">
        {menu.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`cursor-pointer hover:underline font-medium ${
              location.pathname === item.path ? "text-green-600 font-bold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Пустой div для адаптивного меню (можно позже добавить бургер-меню) */}
      <div className="w-[90px] h-[90px] bg-green-300 flex justify-center items-center"></div>
    </div>
  );
};


