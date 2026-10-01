"use client";
import { motion } from "motion/react";
import { useQuietMotion } from "./use-quiet-motion";
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useQuietMotion();
  return (
    <motion.div
      className={`motion-reveal ${className}`}
      initial={false}
      animate={reduce ? { y: 0, opacity: 1 } : undefined}
      whileInView={reduce ? undefined : { y: [20, 0], opacity: [0.7, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
