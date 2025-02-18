import React from "react";
import { FaSmile, FaHeart, FaRocket } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const aboutItems = [
  {
    id: 1,
    text: `Привет! Я студентка ДВФУ по направлению "Прикладная математика и информатика". 
           Я стремлюсь стать Full Stack разработчиком, находя вдохновение в сложных задачах и новых технологиях.`,
    bg: "bg-green-200 border-green-400 text-gray-800",
  },
  {
    id: 2,
    text: "Я дружелюбная, добрая и всегда готова работать над собой, чтобы улучшать свои навыки.",
    icon: <FaSmile className="text-yellow-500 text-xl" />,
    bg: "bg-yellow-200 border-yellow-400 text-gray-800",
  },
  {
    id: 3,
    text: "В свободное время мне нравится изучать новые технологии, участвовать в командных проектах и находить творческие решения для сложных задач.",
    icon: <FaRocket className="text-purple-500 text-xl" />,
    bg: "bg-purple-200 border-purple-400 text-gray-800",
  },
  {
    id: 4,
    text: "Я также увлекаюсь природой и иногда ищу вдохновение в прогулках по лесу.",
    icon: <span role="img" aria-label="mushroom" className="text-2xl">🍄</span>,
    bg: "bg-pink-200 border-pink-400 text-gray-800",
  },
];

export const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "light" ? "light-gradient" : "dark-gradient"} 
      relative flex flex-col items-center w-full min-h-screen px-5 py-12`}
    >
      <h1 className="text-5xl font-extrabold text-green-600 mb-12 relative">
        Обо мне
      </h1>

      {/* Контейнер с описанием */}
      <div className="flex flex-col items-center space-y-8 max-w-4xl">
        {aboutItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className={`border p-6 rounded-lg shadow-md text-center self-${index % 2 === 0 ? "start" : "end"} ${item.bg}`}
          >
            <p className="text-lg flex items-center justify-center gap-2">
              {item.icon} {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Завершающий текст */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: aboutItems.length * 0.3, duration: 0.6 }}
        className="mt-12 text-lg text-green-600 font-semibold flex items-center gap-2"
      >
        <FaHeart className="text-red-500" />
        Стремлюсь создавать полезные и вдохновляющие проекты!
      </motion.div>
    </div>
  );
};

