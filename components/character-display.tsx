"use client";

import { motion } from "framer-motion";

interface CharacterDisplayProps {
  character: string;
}

export function CharacterDisplay({ character }: CharacterDisplayProps) {
  return (
    <motion.div
      key={character}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex justify-center mb-8"
    >
      <div className="text-8xl font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
        {character}
      </div>
    </motion.div>
  );
}