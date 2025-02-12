import React from "react";
import userImage from "../assets/user_image.png"; 

export const ProfilePic = () => {
  return (
    <div className="fixed">
      <img src={userImage} className="h-screen object-cover" alt="User" />
    </div>
  );
};
