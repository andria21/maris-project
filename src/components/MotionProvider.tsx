"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
}

export default function MotionWrapper({ children }: MotionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
