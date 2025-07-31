"use client"

import { motion } from "framer-motion"
import ReportsHeader from "@/components/reports/ReportsHeader"
import ReportsStats from "@/components/reports/ReportsStats"
import ReportsCharts from "@/components/reports/ReportsCharts"
import ReportsMetrics from "@/components/reports/ReportsMetrics"
import { mockTests } from "@/data/mockTests"
import { staggerChildren } from "@/lib/animations"

export default function ReportsPage() {
  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="container mx-auto p-6 space-y-8"
    >
      <ReportsHeader />
      
      <ReportsStats tests={mockTests} />
      
      <ReportsCharts />
      <ReportsMetrics tests={mockTests} />
    </motion.div>
  )
}