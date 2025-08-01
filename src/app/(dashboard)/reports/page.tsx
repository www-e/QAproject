"use client"

import { motion } from "framer-motion"
import { useEffect, Suspense, lazy } from "react"
import { mockTests } from "@/data/mockTests"
import { staggerChildren } from "@/lib/animations"
import { preloadPage } from "@/lib/dynamic-imports"

// CRITICAL: Load essential UI immediately
import ReportsHeader from "@/components/reports/ReportsHeader"
import ReportsStats from "@/components/reports/ReportsStats"

// LAZY: Only heavy chart components
const ReportsCharts = lazy(() => import("@/components/reports/ReportsCharts"))
const ReportsMetrics = lazy(() => import("@/components/reports/ReportsMetrics"))

// Loading fallback for reports components
const ReportsLoader = () => (
  <div className="h-32 bg-muted rounded-lg animate-pulse" />
)

export default function ReportsPage() {
  useEffect(() => {
    // Preload adjacent tabs
    preloadPage(() => import("../workflow/page"))
    preloadPage(() => import("../dashboard/page"))
  }, [])

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="container mx-auto p-6 space-y-8"
    >
      <ReportsHeader />
      
      <ReportsStats tests={mockTests} />
      
      <Suspense fallback={<div className="h-64 bg-muted rounded-lg animate-pulse" />}>
        <ReportsCharts />
      </Suspense>
      
      <Suspense fallback={<ReportsLoader />}>
        <ReportsMetrics tests={mockTests} />
      </Suspense>
    </motion.div>
  )
}