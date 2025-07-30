"use client"

import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export default function WorkflowHeader() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="text-center space-y-4">
        <TextGenerateEffect
          words="سير عمل اختبار الجودة"
          className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        />
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          تتبع مراحل عملية اختبار الجودة من التخطيط إلى الاعتماد النهائي
        </p>
      </motion.div>
    </motion.div>
  )
}