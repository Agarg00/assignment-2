import React from "react";
import { motion } from "framer-motion";

interface UserProfileCardProps {
  name: string;
  usage: string;
  avatarUrl: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  usage,
  avatarUrl,
}) => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg max-w-sm h-full max-h-[440px]  w-full mx-auto my-8 overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 user-card-bg rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 user-card-bg2 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        {/* Usage text */}
        <motion.div
          className="relative z-10 text-4xl font-bold text-white mb-6 px-4 py-2 rounded-xl orange-gradient-text"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {usage}
        </motion.div>

        {/* User image */}
        <motion.img
          src={avatarUrl}
          alt={name}
          className="relative z-10 w-36 h-36 rounded-full object-cover mb-6 border-4 border-white border-opacity-30 shadow-lg"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "backOut" }}
        />

        {/* User name */}
        <motion.div
          className="relative z-10 text-3xl font-semibold text-white mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {name}
        </motion.div>
      </motion.div>
      <motion.div className="absolute z-0 -top-5 rotate-12 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center justify-center p-6 user-card-bg bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg max-w-sm h-full max-h-[440px]  w-full mx-auto my-8 overflow-hidden"></motion.div>
      <motion.div className="absolute z-0 -top-0 -rotate-12 origin-top-left left-1/2 -translate-x-[53%] translate-y-1/2 flex flex-col items-center justify-center p-6 user-card-bg bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg max-w-sm h-full max-h-[440px]  w-full mx-auto my-8 overflow-hidden opacity-80"></motion.div>
    </div>
  );
};

export default UserProfileCard;
