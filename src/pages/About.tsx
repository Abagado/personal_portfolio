import React from "react";
import { FaSmile, FaHeart, FaRocket } from "react-icons/fa";

export const About = () => {
  return (
    <div className="relative flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-white to-green-100 px-5 py-12">
      <h1 className="text-5xl font-extrabold text-green-600 mb-12 relative">
        Обо мне
      </h1>

      {/* Контейнер с описанием */}
      <div className="flex flex-col items-center space-y-8 max-w-4xl">
        {/* Первый абзац */}
        <div className="bg-green-200 border border-green-400 p-6 rounded-lg shadow-md text-center self-start">
          <p className="text-lg text-gray-800">
            Привет! Я студентка ДВФУ по направлению{" "}
            <span className="text-green-600 font-semibold">
              "Прикладная математика и информатика"
            </span>
            . Я стремлюсь стать Full Stack разработчиком, находя вдохновение в
            сложных задачах и новых технологиях.
          </p>
        </div>

        {/* Второй абзац */}
        <div className="bg-yellow-200 border border-yellow-400 p-6 rounded-lg shadow-md text-center self-end">
          <p className="text-lg flex items-center justify-center gap-2 text-gray-800">
            <FaSmile className="text-yellow-500 text-xl" />
            Я дружелюбная, добрая и всегда готова работать над собой, чтобы
            улучшать свои навыки.
          </p>
        </div>

        {/* Третий абзац */}
        <div className="bg-purple-200 border border-purple-400 p-6 rounded-lg shadow-md text-center self-start">
          <p className="text-lg flex items-center justify-center gap-2 text-gray-800">
            <FaRocket className="text-purple-500 text-xl" />
            В свободное время мне нравится изучать новые технологии,
            участвовать в командных проектах и находить творческие решения для
            сложных задач.
          </p>
        </div>

        {/* Четвертый абзац */}
        <div className="bg-pink-200 border border-pink-400 p-6 rounded-lg shadow-md text-center self-end">
          <p className="text-lg flex items-center justify-center gap-2 text-gray-800">
            <span role="img" aria-label="mushroom" className="text-2xl">
              🍄
            </span>
            Я также увлекаюсь природой и иногда ищу вдохновение в прогулках по
            лесу.
          </p>
        </div>
      </div>

      <div className="mt-12 text-lg text-green-600 font-semibold flex items-center gap-2">
        <FaHeart className="text-red-500" />
        Стремлюсь создавать полезные и вдохновляющие проекты!
      </div>

      {/* Декоративные элементы */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-green-300 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-200 rounded-lg rotate-12 opacity-50 blur-lg"></div>
      </div>
    </div>
  );
};

