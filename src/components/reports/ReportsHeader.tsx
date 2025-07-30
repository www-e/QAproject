"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { Icons } from "@/components/ui/icons"
import { fadeInUp, staggerChildren } from "@/lib/animations"

export default function ReportsHeader() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp} className="text-center space-y-4">
        <TextGenerateEffect
          words="التقارير والمقاييس المتقدمة"
          className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        />
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          تحليلات شاملة ومقاييس متقدمة لأداء الاختبارات والجودة
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp}>
          <Button className="btn-primary">
            <Icons.fileText className="ml-2 h-4 w-4" />
            تصدير التقرير الشامل
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Button variant="outline">
            <Icons.chart className="ml-2 h-4 w-4" />
            تخصيص المقاييس
          </Button>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Button variant="secondary">
            <Icons.bell className="ml-2 h-4 w-4" />
            إعداد التنبيهات
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}