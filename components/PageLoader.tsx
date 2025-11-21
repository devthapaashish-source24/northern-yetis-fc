"use client";
import { motion } from "framer-motion";
export default function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 bg-[#4A154B] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}