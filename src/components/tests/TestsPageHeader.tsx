"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export default function TestsPageHeader() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm px-4 py-2">
          🧪 مركز التحكم
        </Badge>
        <TextGenerateEffect
          words="مركز إدارة الاختبارات المتقدم"
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          تتبع وإدارة جميع اختباراتك مع لوحة تحكم متقدمة وتحليلات في الوقت الفعلي
        </p>
      </motion.div>
    </motion.div>
  )
}
