import React from "react";
import userImage from "../assets/user_image.png"; // Импорт изображения как модуля

export const ProfilePic = () => {
  return (
    <div className="fixed">
      <img src={userImage} className="h-screen object-cover" alt="User" />
    </div>
  );
};

export default ProfilePic; // Дефолтный экспорт