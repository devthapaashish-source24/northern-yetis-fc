"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (children !== displayChildren) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [children, displayChildren]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.3
        }}
        className="min-h-screen"
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
  );
}