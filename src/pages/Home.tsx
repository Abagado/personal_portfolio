import { Introduction } from "../components/Introduction";
import { ProfilePic } from "../components/ProfilePic";
import { useTheme } from "../context/ThemeContext"; 
import { motion } from "framer-motion";

export const Home = () => {
  const { theme } = useTheme(); 

  return (
    <motion.div
      className={` min-h-screen grid grid-cols-1 md:grid-cols-3 ${theme === "light" ? "bg-green-200 text-black" : "bg-gray-900 text-white"}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`col-span-2 p-5 ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"} `}>
        <Introduction />
      </div>
      <div className="hidden md:block">
        <ProfilePic />
      </div>
    </motion.div>
  );
};
