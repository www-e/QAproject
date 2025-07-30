"use client"

import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export default function DashboardHeader() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="text-center space-y-4"
    >
      <TextGenerateEffect
        words="مرحباً بك في لوحة تحكم الجودة المتقدمة"
        className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
      />
      <motion.p
        className="text-muted-foreground text-lg max-w-2xl mx-auto"
        variants={fadeInUp}
      >
        تتبع أداء اختباراتك وإدارة جودة مشاريعك بأحدث التقنيات والذكاء الاصطناعي
      </motion.p>
    </motion.div>
  )
}