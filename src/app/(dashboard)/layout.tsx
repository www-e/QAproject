"use client"

import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { TopNavigation } from "@/components/layout/top-navigation"
import { PageTransition } from "@/components/ui/page-transition"
import { pageTransitions } from "@/lib/animations"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Container with Modern Grid */}
      <div className="flex h-screen overflow-hidden">
        {/* Enhanced Sidebar using your Aceternity component */}
        <motion.aside
          className="relative z-30"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DashboardSidebar />
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <motion.header
            className="relative z-20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          >
            <TopNavigation />
          </motion.header>

          {/* Page Content with Smooth Transitions */}
          <main className="flex-1 overflow-auto">
            <motion.div
              className="h-full"
              variants={pageTransitions}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PageTransition>
                {children}
              </PageTransition>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
