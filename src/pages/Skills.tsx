import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiCplusplus, SiSharp, SiTypescript, SiReact, SiFigma, 
  SiPython, SiGit, SiHtml5, SiCss3, SiPostgresql 
} from "react-icons/si";
import { useTheme } from "../context/ThemeContext";

const skills = [
  { name: 'C++', icon: <SiCplusplus className="text-blue-600" /> },
  { name: 'C#', icon: <SiSharp className="text-purple-600" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
  { name: 'React', icon: <SiReact className="text-blue-400" /> },
  { name: 'Figma', icon: <SiFigma className="text-pink-500" /> },
  { name: 'Python', icon: <SiPython className="text-blue-300" /> },
  { name: 'Git', icon: <SiGit className="text-orange-500" /> },
  { name: 'HTML/CSS', icon: (
    <div className="flex space-x-2">
      <SiHtml5 className="text-red-500" />
      <SiCss3 className="text-blue-600" />
    </div>
  ) },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" /> },
];

export const Skills = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center justify-start w-full min-h-screen 
        ${theme === "light" ? "light-gradient" : "dark-gradient"} px-5 py-12`}
    >
      <h1 className="text-4xl font-bold mb-8 text-green-600">Навыки</h1>
      
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg text-gray-700"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center p-4 bg-gray-100 rounded shadow hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-3">{skill.icon}</div>
            <h2 className="font-medium">{skill.name}</h2>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};






