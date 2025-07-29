"use client"

import { motion } from "framer-motion"
import { pageTransitions } from "@/lib/animations"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      className={`w-full h-full ${className}`}
      variants={pageTransitions}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
