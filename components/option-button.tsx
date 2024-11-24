"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface OptionButtonProps {
  option: string;
  index: number;
  onClick: () => void;
}

export function OptionButton({ option, index, onClick }: OptionButtonProps) {
  return (
    <motion.div
      key={option}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
    >
      <Button
        variant="outline"
        className="w-full text-lg py-6 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
        onClick={onClick}
      >
        {option}
      </Button>
    </motion.div>
  );
}